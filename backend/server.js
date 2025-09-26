// server.js
import express from 'express';
import mongo from './db.js';
import bcrypt from "bcryptjs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
res.send("🚀 Server running and connected to MongoDB");
});


  // Insert into "testCollection"
  app.post('/data', async (req, res) => {
    try {
      const result = await mongo.insert('testCollection', req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to insert document' });
    }
});

  // Read from "testCollection"
  app.get('/data', async (req, res) => {
    try {
      const cursor = await mongo.find('testCollection');
      const docs = await cursor.toArray();
      res.json(docs);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch documents' });
    }
  });

  //Added login route -Perla 
  app.post("/login-user", async (req, res) =>  {
   try{
    const {email, password} = req.body; //gets email and password from front end 

    //Find the user in "users" collection

    const user = await mongo.findOne("users", {email});

    if(!user){
      return res.status(400).json({ message: " user not found "})
    }

    //compare the passwords
    const valid = await bcrypt.compare(password, user.passwordHash);

    if(!valid){
      return res.status(400).json({error: "Incorrect Password "})
    }

    res.json({message: "Login Successful", user: {email: user.email }});


   }catch(err){
    console.log(err);
    res.status(500).json({error: " Login Failed "})
   }
  });


(async () => {
await mongo.connect();


  app.listen(PORT, () => {
    console.log(`🌍 Server listening on http://localhost:${PORT}`);
  });
})();
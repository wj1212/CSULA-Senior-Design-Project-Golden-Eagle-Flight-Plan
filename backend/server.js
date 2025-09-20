// server.js
import express from 'express';
import mongo from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

(async () => {
  await mongo.connect();

  app.get('/', (req, res) => {
    res.send('🚀 Server running and connected to MongoDB');
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

  app.listen(PORT, () => {
    console.log(`🌍 Server listening on http://localhost:${PORT}`);
  });
})();

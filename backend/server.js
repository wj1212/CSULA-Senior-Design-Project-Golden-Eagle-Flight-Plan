// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mongo from './db.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true
}));
app.use(express.json());

(async () => {
  await mongo.connect();
  
  // Connect Mongoose to the same database
  const mongooseURL = (process.env.DB_CONNECTION_STRING || 'mongodb+srv://wenjie:Fyr6I9ajVPxIUtMe@csula-gefp-cluster.owgodwl.mongodb.net/?retryWrites=true&w=majority&appName=csula-gefp-cluster').replace('?', '/testDB?');
  await mongoose.connect(mongooseURL);
  console.log('✅ Mongoose connected to MongoDB testDB');

  // Routes
  app.use('/api/auth', authRoutes);

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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌍 Server listening on http://localhost:${PORT}`);
    console.log(`🌍 Server also accessible on your network IP: http://[YOUR_IP]:${PORT}`);
  });
})();

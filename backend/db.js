// db.js
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

// Use the complete connection string from environment variable
const mongoURL = process.env.DB_CONNECTION_STRING || 'mongodb+srv://wenjie:Fyr6I9ajVPxIUtMe@csula-gefp-cluster.owgodwl.mongodb.net/?retryWrites=true&w=majority&appName=csula-gefp-cluster';

let client;
let db;

async function connect() {
  try {
    client = new MongoClient(mongoURL);
    await client.connect();
    db = client.db('testDB');
    console.log(`✅ Connected to MongoDB: testDB`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}

async function close() {
  try {
    await client.close();
    console.log('🔌 Connection to MongoDB closed');
  } catch (err) {
    console.error(err);
  }
}

async function insert(collectionName = 'testCollection', data) {
  const collection = db.collection(collectionName);
  return await collection.insertOne(data);
}

async function find(collectionName = 'testCollection', query = {}) {
  const collection = db.collection(collectionName);
  const cursor = await collection.find(query);
  return cursor;
}

async function update(collectionName = 'testCollection', query, data) {
  const collection = db.collection(collectionName);
  return await collection.updateOne(query, { $set: data });
}

export default { connect, close, insert, find, update, ObjectId };

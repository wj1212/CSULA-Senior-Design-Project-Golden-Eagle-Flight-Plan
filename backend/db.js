// db.js
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_URL, DB_NAME } = process.env;
const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

let client;
let db;

async function connect() {
  try {
    client = new MongoClient(mongoURL);
    await client.connect();
    db = client.db();
    console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
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
  return await collection.find(query);
}

async function update(collectionName = 'testCollection', query, data) {
  const collection = db.collection(collectionName);
  return await collection.updateOne(query, { $set: data });
}

export default { connect, close, insert, find, update };

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
//https://www.mongodb.com/docs/drivers/node/current/crud/query/retrieve/
//function to find one documment that matches the users credentials
//define query so we don't get an empty object 
async function findOne(collectionName = 'users', query = {}){

  //grab collection called 'users'
  const collection = db.collection(collectionName);
  //findOne() finds matching documment
  return await collection.findOne(query);


}

export default { connect, close, insert, find, update, findOne };
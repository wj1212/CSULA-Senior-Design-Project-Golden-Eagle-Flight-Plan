require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const connectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(connectionString)
  .then(() => console.log('✅ Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ Connection error', err));
// -------------------------

app.get('/', (req, res) => {
  res.send('Hello from the Golden Eagle Flight Plan Backend!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
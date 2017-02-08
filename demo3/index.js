const { graphql } = require('graphql');
const readline = require('readline');

const itemSchema = require('./schema/main');

const { MongoClient } = require('mongodb');
const assert = require('assert');

const MONGO_URL = 'mongodb://localhost:27017/test';

// Connect to mongoDB
MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err);
  console.log('Connected to MongoDB server');

  const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rli.question('Client Request: ', inputQuery => {
    graphql(itemSchema, inputQuery, {}, { db }).then(result => { // Passing { db } object to graphQL server.
      console.log('Server Answer :', result.data)
      db.close(() => rli.close());
    });
  });
});

// Sample query:
// { name(itemId: 1) price soldOut appearIn }

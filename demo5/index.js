const { graphql } = require('graphql');

const rootSchema = require('./schema/main');
const path = require('path');

const { MongoClient } = require('mongodb');
const assert = require('assert');

const graphqlHTTP = require('express-graphql');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // Serve static contents under /public directory

const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err);
  console.log('Connected to MongoDB server');

  app.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    context: { db },
    graphiql: true
  }));

  app.listen(3000, () =>
    console.log('/graphql GraphiQL is running on port 3000')
  );
});

// Sample query
// {
//   player(playerName: "Ash") {
//     name
//     age
//     items {
//       name
//       quantity
//     }
//   }
// }

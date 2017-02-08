const { graphql } = require('graphql');

const rootSchema = require('./schema/main');

const { MongoClient } = require('mongodb');
const assert = require('assert');

const graphqlHTTP = require('express-graphql');
const express = require('express');

const app = express();

const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err);
  console.log('Connected to MongoDB server');

  // Expose rootSchema in an HTTP interface,
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

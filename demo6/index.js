const { graphql } = require('graphql');

const rootSchema = require('./schema/main');
const fs = require('fs');
const path = require('path');

// introspectionQuery can be used to build query object that Relay requires.
const { introspectionQuery } = require('graphql/utilities');

const { MongoClient } = require('mongodb');
const assert = require('assert');

const graphqlHTTP = require('express-graphql');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const MONGO_URL = 'mongodb://localhost:27017/test';


MongoClient.connect(MONGO_URL, (err, db) => {
  assert.equal(null, err);
  console.log('Connected to MongoDB server');

  app.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    context: { db },
    graphiql: true
  }));

  // introspectionQuery utility of graphQL fetches detailed information about the schema.
  // It tells Relay about graphQL schema, so that Relay can correctly convert template literal represented as Relay.QL.
  graphql(rootSchema, introspectionQuery)
    .then(result => {
      console.log('introspectionQuery response:' + JSON.stringify(result, null, 2));
      // Save JSON of full schema introspection for Babel Relay Plugin to use.
      fs.writeFileSync(
        path.join(__dirname, 'cache/schema.json'),
        JSON.stringify(result, null, 2)
      );
     console.log('Generated cached schema.json file');
    })
    .catch(console.error);

  app.listen(3000, () =>
    console.log('/graphql GraphiQL is running on port 3000')
  );
});

const { graphql } = require('graphql');
const readline = require('readline');

const sampleSchema = require('./schema/main');

const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Waits input from CLI
rli.question('Client Request: ', inputQuery => {
  // Query graphQL server
  graphql(sampleSchema, inputQuery).then(result => {
    console.log('Server Answer :', result.data);
  });

  rli.close();
});

// Sample query:
// { hello }

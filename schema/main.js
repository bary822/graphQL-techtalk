const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const sampleQueryType = new GraphQLObjectType({
  name: 'RootQuery', // name can be anything
  fields: {
    hello: { // name of field, which is 'hello'.
      type: GraphQLString, // type of field, which is String.
      resolve: () => 'world' // how this field be resolved by server.
    }
  }
})

// GraphQLSchema's 'query' property defines a special entry point.
const sampleSchema = new GraphQLSchema({
  query: sampleQueryType
})

module.exports = sampleSchema;

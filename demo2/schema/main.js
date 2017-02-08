const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} = require('graphql');

const itemNameList = [ 'Poké Ball', 'Potion', 'Revive' ];

// itemQueryType defines fields
const itemQueryType = new GraphQLObjectType({
  name: 'ProductQuery',
  fields: {
    name: {
      type: GraphQLString,
      args: {
        itemId: { type: GraphQLInt } // Each fields can take multiple arguments which can be used to resolve.
      },
      resolve: (_, args) => itemNameList[args.itemId] // A function that resolves this field.
    },
    price: {
      type: GraphQLInt,
      resolve: () => Math.floor(Math.random() * 1000)
    },
    soldOut: {
      type: GraphQLBoolean,
      resolve: () => false
    },
    appearIn: {
      type: new GraphQLList(GraphQLString),
      resolve: () => [ 'Red & Green', 'Gold & Silver', 'Ruby & Sapphire' ]
    }
  }
})

const itemSchema = new GraphQLSchema({
  query: itemQueryType
})

module.exports = itemSchema;

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} = require('graphql');

const itemQueryType = new GraphQLObjectType({
  name: 'ItemQuery',
  fields: {
    name: {
      type: GraphQLString,
      args: {
        itemId: { type: GraphQLInt }
      },
      resolve: (_, args, { db }) => { // passed db object can be used for resolving value for the field.
        return new Promise((resolve, reject) => {
          db.collection('itemNameList')
                   .findOne()
                   .then(doc => {
                     doc.items[args.itemId]
                      ? resolve(doc.items[args.itemId])
                      : reject('404 Not found').catch(reason => console.log(reason));
                   })
        })
      }
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

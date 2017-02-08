const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} = require('graphql');

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    name:     { type: GraphQLString },
    quantity: { type: GraphQLInt }
  })
})

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    name:  {
      type: GraphQLString,
      resolve: (obj) => `Pokémon Trainer ${obj.name}` // obj represents player object resolved by top-level rootQueryType.
    },
    age:   { type: GraphQLInt },
    items: { type: new GraphQLList( ItemType ) }
  })
});

// Remember this schema:
// db.players.insertOne({
//   name: 'Ash',
//   age: 10,
//   items: [
//     { name: 'Poké Ball', quantity: 5 },
//     { name: 'Escape rope', quantity: 1 }
//   ]
// });
const rootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    player: {
      type: PlayerType, // Custom type(another instance of GraphQLObjectType)
      args: {
        playerName: { type: GraphQLString }
      },
      resolve: (_, args, { db }) => {
        return db.collection('players')
                 .findOne({ name: args.playerName }) // Find document based on given argument 'playerName'
      }
    }
  }
})

const rootSchema = new GraphQLSchema({
  query: rootQueryType
})

module.exports = rootSchema;

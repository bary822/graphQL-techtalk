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
      resolve: (obj) => `Pokémon Trainer ${obj.name}`
    },
    age:   { type: GraphQLInt },
    items: { type: new GraphQLList( ItemType ) }
  })
});

const rootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    player: {
      type: PlayerType,
      args: {
        playerName: { type: GraphQLString }
      },
      resolve: (_, args, { db }) => {
        return db.collection('players')
                 .findOne({ name: args.playerName })
      }
    }
  }
})

const rootSchema = new GraphQLSchema({
  query: rootQueryType
})

module.exports = rootSchema;

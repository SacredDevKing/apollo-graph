// Make available throughout app
require('dotenv').config();

// Dep imports
const { ApolloServer } = require('apollo-server');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');

// Relative imports
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');
const mongoConnect = require('./Mongoose/connection');

// Create apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// Listen for our server and connect mongo db
mongoConnect
  .then(() => {
    console.log('MongoDB connected successfully...');
    return server.listen({ port: 6001 });
  })
  .then(({ url }) => console.log(`🚀  Blast off @ ${url}`));

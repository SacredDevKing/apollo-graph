// Make available throughout app
require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoConnect = require('./Mongoose/connection');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// Listen for our server
mongoConnect
  .then(() => {
    console.log('MongoDB connected successfully...');
    return server.listen({ port: 6001 });
  })
  .then(({ url }) => console.log(`🚀  Ready to goooo @ ${url}`));

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => console.log(`Server is running at ${url}`));

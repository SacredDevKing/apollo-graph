const { ApolloServer } = require("apollo-server");
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then((res) => console.log(`Res: ${res}. Server is running!`));

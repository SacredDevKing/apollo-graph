const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    greeting: String!
  }
`;

module.exports = typeDefs;

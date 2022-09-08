const { gql } = require('apollo-server');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    updatedAt: String
    username: String!
  }

  type Query {
    getPosts: [Post]
  }
`;

module.exports = typeDefs;

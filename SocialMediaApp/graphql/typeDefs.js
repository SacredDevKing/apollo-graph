const { gql } = require('apollo-server');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    updatedAt: String
    username: String!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getUsers: [User]
  }
`;

module.exports = typeDefs;

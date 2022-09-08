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
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!,
    password: String!,
    email: String!,
    confirmPassword: String!,
  }

  type Query {
    getPosts: [Post]
    getUsers: [User]
  }

  type Mutation {
    register(registerInput: RegisterInput): User! {}
  }
`;

module.exports = typeDefs;

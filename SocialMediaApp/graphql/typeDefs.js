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

  type Query {
    getPosts: [Post]
    getUsers: [User]
  }

  input RegisterUserInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Mutation {
    register(registerUserInput: RegisterUserInput): User!
    login(username: String!, password: String!): User!
  }
`;

module.exports = typeDefs;

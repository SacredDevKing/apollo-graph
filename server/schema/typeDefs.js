/**
 * A schema is a collection of type definitions (hence "typeDefs")
 * that together define the "shape" of queries that are executed against
 * your data.
 *
 * https://www.apollographql.com/docs/apollo-server/getting-started#step-4-define-your-data-set
 */
const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    country: Country!
    username: String!
    email: String!
    age: Int!
    friends: [User!]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    title: String!
    releaseYear: Int!
    awards: String
    genre: String
    language: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(title: String!): Movie
  }

  input CreateUserInput {
    name: String!
    country: Country = BRAZIL
    username: String!
    email: String!
    age: Int!
  }

  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
  }

  enum Country {
    USA
    CANADA
    CHILE
    GERMANY
    ARMENIA
    ARGENTINA
  }
`;

module.exports = typeDefs;

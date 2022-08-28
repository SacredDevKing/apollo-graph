/**
 * Resolvers define the technique for fetching the
 * types defined in the schema.
 *
 * Docs:
 * A resolver is a function that's responsible for populating the data for a single field in your schema.
 * It can populate that data in any way you define, such as by fetching data from a back-end
 * database or a third-party API.
 */
const UsersList = require('./userData');
const MoviesList = require('./MoviesList');
const _ = require('lodash');

const resolvers = {
  Query: {
    // User resolvers
    users: () => {
      return UsersList;
    },
    user: (parent, args) => {
      const id = Number(args.id);

      return _.find(UsersList, { id });
    },
    // Movie Resolvers
    movie: (parent, args) => {
      const title = args.title;

      return _.find(MoviesList, { title });
    },
    movies: () => {
      return MoviesList;
    },
  },
  User: {
    favoriteMovies: (parent, args) => {
      // Get a users favorite movies if any.
      return _.filter(
        MoviesList,
        (movie) => movie.releaseYear >= 2010 && movie.releaseYear <= 2012
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      // Simulate adding row to DB
      const user = args.input;
      const lastUserId = UsersList[UsersList.length - 1].id;
      user.id = lastUserId + 1;

      UsersList.push(user);

      return user;
    },
    updateUsername: (_, args) => {
      const { id, newUsername } = args.input;
      let updatedUser;
      UsersList.forEach((user) => {
        if (user.id !== id) throw Error('Cannot update this user');

        if (user.id === Number(id)) {
          user.username = newUsername;
          updatedUser = user;
        }
      });

      return updatedUser;
    },
  },
};

module.exports = resolvers;

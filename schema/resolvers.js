/**
 * Resolvers define the technique for fetching the
 * types defined in the schema.
 *
 * Docs:
 * A resolver is a function that's responsible for populating the data for a single field in your schema.
 * It can populate that data in any way you define, such as by fetching data from a back-end
 * database or a third-party API.
 */
const UsersList = require('./sampleData');
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
};

module.exports = resolvers;

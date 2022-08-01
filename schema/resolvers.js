/**
 * Resolvers define the technique for fetching the
 * types defined in the schema.
 *
 * Docs:
 * A resolver is a function that's responsible for populating the data for a single field in your schema.
 * It can populate that data in any way you define, such as by fetching data from a back-end
 * database or a third-party API.
 */
const UsersList = require("./sampleData");

const resolvers = {
  Query: {
    users() {
      // In place of a db call for now
      return UsersList;
    },
  },
};

module.exports = resolvers;

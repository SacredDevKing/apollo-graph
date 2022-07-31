/**
 * Resolvers define the technique for fetching the
 * types defined in the schema.
 */
const UsersList = require("./sampleData");

const resolvers = {
  Query: {
    users() {
      return UsersList;
    },
  },
};

module.exports = resolvers;

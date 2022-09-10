// Resolve logic for any query, mutations or subscriptions

const User = require('../../Mongoose/models/User');

module.exports = {
  Query: {
    async getUsers() {
      try {
        // Beings back all users
        return await User.find();
      } catch (error) {
        throw Error(`Error: ${error}`);
      }
    },
  },
  // Mutation: {
  //   async register(_, args, context, info) {
  //     // TODO: Validate data
  //     // TODO: Check for unique user in db
  //     // TODO: hash pw before storing + create auth token
  //   },
  // },
};

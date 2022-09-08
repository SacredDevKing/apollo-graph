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
};

// Resolve logic for any query, mutations or subscriptions

const Post = require('../../Mongoose/models/Post');

module.exports = {
  Query: {
    async getPosts() {
      try {
        // Beings back all posts
        return await Post.find();
      } catch (error) {
        throw Error(`Error: ${error}`);
      }
    },
  },
};

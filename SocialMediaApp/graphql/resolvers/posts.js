// Resolve logic for any query, mutations or subscriptions
const Post = require('../../Mongoose/models/Post');

module.exports = {
  Query: {
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);

        return post && post;
      } catch (error) {
        throw new Error(`Error ${error.message}`);
      }
    },
    async getPosts() {
      try {
        // Beings back all posts
        return await Post.find();
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    },
  },
  Mutation: {
    async createPost() {},
    async deletePost(_, { postId }) {},
  },
};

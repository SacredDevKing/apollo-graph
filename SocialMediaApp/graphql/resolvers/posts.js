// Resolve logic for any query, mutations or subscriptions
const Post = require('../../Mongoose/models/Post');
const { UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    async getPost(_, { postId }) {
      const post = await Post.findById(postId);

      if (!post) throw new UserInputError('No post found');

      return {
        ...post._doc,
        id: post._id,
      };
    },
    async getPosts() {
      try {
        // Beings back all posts
        return await Post.find();
      } catch (error) {
        throw Error(`Error: ${error}`);
      }
    },
  },
  Mutation: {
    async createPost() {},
    async deletePost(_, { postId }) {},
  },
};

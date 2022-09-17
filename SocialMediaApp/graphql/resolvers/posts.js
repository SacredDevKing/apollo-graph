// Resolve logic for any query, mutations or subscriptions
const Post = require('../../Mongoose/models/Post');
const checkAuth = require('../../util/validators/check-auth');

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
        // Beings back all posts in DESC order
        return await Post.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      // Find/validate users token + return user
      const user = checkAuth(context);

      console.log({ USERR: user });

      // User is able to create post
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Use mongoose DB save method
      return await newPost.save();
    },
    async deletePost(_, { postId }) {},
  },
};

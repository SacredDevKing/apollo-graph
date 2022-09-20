const Post = require('../../Mongoose/models/Post');
const checkAuth = require('../../util/validators/check-auth');
const { UserInputError } = require('apollo-server');

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      // Destruct username from user
      const { username } = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: { body: 'Comment body cannot be empty' },
        });
      }

      const post = await Post.findById(postId);

      if (!post) throw new UserInputError('Post was not found');

      // Unshift will add newest to top
      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Persist post
      await post.save();

      return post;
    },
    async deleteComment(_, { postId, commentId }, context) {
      // TODO: delete comment
    },
    async likePost(_, { postId }, context) {
      // TODO: like post
    },
  },
};

const Post = require('../../Mongoose/models/Post');
const checkAuth = require('../../util/validators/check-auth');
const { UserInputError, AuthenticationError } = require('apollo-server');

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
      const post = await Post.findById(postId);
      const { username } = checkAuth(context);
      // Find comment and delete it by it's index
      const commentIndex = post.comments.findIndex(
        (com) => com.id === commentId
      );

      // Series of bail out checks
      if (!post) throw new UserInputError('Post was not found');
      if (!username) throw new UserInputError('User was not found');
      if (commentIndex < 0) throw Error('Comment was not found');

      if (post.comments[commentIndex].username !== username) {
        throw new AuthenticationError(
          'You are not authorized to delete this comment'
        );
      }

      // The owner of the comment CAN delete
      post.comments.splice(commentIndex, 1);
      await post.save();

      return post;
    },
    async likePost(_, { postId }, context) {
      // TODO: like post
    },
  },
};

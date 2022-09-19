const Post = require('../../Mongoose/models/Post');
const checkAuth = require('../../util/validators/check-auth');
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Mutation: {
    async createComment(postId, body) {
      // TODO: create comment
    },
    async deleteComment(postId, commentId) {
      // TODO: delete comment
    },
    async likePost(postId) {
      // TODO: like post
    },
  },
};

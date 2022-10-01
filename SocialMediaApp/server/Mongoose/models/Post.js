const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  updatedAt: String,
  deletedAt: { type: Date, default: Date.now() },
  comments: [
    { body: String, username: String, createdAt: String, updatedAt: String },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
      updatedAt: String,
    },
  ],
  // Link posts to users
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('Post', postSchema);

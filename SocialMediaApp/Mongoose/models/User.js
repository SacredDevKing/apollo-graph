const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  updatedAt: String,
  deletedAt: { type: Date, default: Date.now() },
});

module.exports = model('User', userSchema);

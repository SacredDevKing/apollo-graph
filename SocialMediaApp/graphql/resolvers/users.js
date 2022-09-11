// Resolve logic for any query, mutations or subscriptions
const User = require('../../Mongoose/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  Mutation: {
    async register(_, { registerUserInput }, context, info) {
      // 1. Pull descruted values from input
      let { username, email, password, confirmPassword } = registerUserInput;
      // 2. hash pw before storing + create auth token
      password = await bcrypt.hash(password, 12);
      //3. Form user obj form mongoose model
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      // 4. Save user to db
      const result = await newUser.save();

      // 5. Create new token for user
      const token = jwt.sign(
        { id: result.id, email: result.email, username: result.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
  },
};

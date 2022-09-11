// Resolve logic for any query, mutations or subscriptions
const User = require('../../Mongoose/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const errorIfMatchingUserExists = async (username, email) => {
  if ((await User.findOne({ username })) || (await User.findOne({ email })))
    throw new UserInputError('Failed to register user', {
      errors: {
        username: 'This username is taken',
        email: 'This email is taken',
      },
    });
};

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
    async register(
      _,
      { registerUserInput: { username, email, password, confirmPassword } }
    ) {
      // Bail early if we find duplicate user w/ uname || email - err msgs to be used on front end later
      return errorIfMatchingUserExists(username, email);

      // Hash pw before storing + create auth token
      password = await bcrypt.hash(password, 12);
      // Form user obj form mongoose model
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      // Save user to db
      const result = await newUser.save();

      // Create new token for user
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

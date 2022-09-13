// Resolve logic for any query, mutations or subscriptions
const User = require('../../Mongoose/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterInput,
} = require('../../util/validators/userRegistrationValidator');
const { validateLoginInput } = require('../../util/validators/loginValidator');

// Helper functions
function createJwt(user) {
  // Create new token for user
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );
}

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
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) throw new UserInputError('UserInputErrors:', { errors });

      // Bail early if we find duplicate uname || email - err msgs to be used on front end later
      if ((await User.findOne({ username })) || (await User.findOne({ email })))
        throw new UserInputError('Failed to register user', {
          errors: {
            username: 'This username is taken',
            email: 'This email is taken',
          },
        });

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

      // Create token
      const token = createJwt(result);

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) throw new UserInputError('Errors', { errors });

      // Look for user
      if (!(await User.findOne({ username }))) {
        errors.generic = 'User not found';
        throw new UserInputError('User not found', { errors });
      } else {
        // Error out of pw is invalid
        if (!(await bcrypt.compare(password, user.password))) {
          errors.generic = 'Incorrect credentials';
          throw new UserInputError('Incorrect credentials', { errors });
        }
      }

      // Credentials are good - let's give em a token
      const token = createJwt(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

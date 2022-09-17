const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  console.log(authHeader);
  // Get token
  const token = authHeader.split('Bearer ')[1];

  if (!authHeader) {
    // Bail out early here
    throw new Error('Authorization header is missing');
  }

  if (!token) {
    throw new Error('Auth token must be formatted as: Bearer [token]');
  }

  // If all is well then verify the users by their token
  try {
    // Verify user
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.error(error);
    throw new AuthenticationError('Invalid/Expired token');
  }
};

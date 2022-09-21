module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === '') errors.username = 'You must provide a username';
  if (password.trim() === '') errors.password = 'You must provide a password';

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

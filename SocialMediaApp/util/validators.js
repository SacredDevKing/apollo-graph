module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  const pwRegex =
    /(?=^.{10,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  const emailRegex =
    /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

  if (username.trim() === '') errors.username = 'You must provide a user name';
  if (email.trim() === '') {
    errors.email = 'You must provide an email address';
  } else {
    if (!email.match(emailRegex)) {
      errors.email = 'Please provide a valid email address';
    }
  }

  if (!password.match(pwRegex))
    password.email =
      'Password contain minimum 10 characters with 1 upper and 1 lower case letter and 1 special character';

  if (password === '') errors.password = 'You must provide a password';
  else if (password !== confirmPassword)
    errors.confirmPassword = 'Passwords must match';

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

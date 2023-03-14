const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
  console.log('post route running.');

  const { username, password } = req.body;
  //array for all error messages that exist.
  const errors = [];

  // backend validations
  if (!username.trim()) {
    errors.push('Username is required.');
  }
  if (username.includes(' ')) {
    errors.push('Username cannot contain spaces.');
  }
  if (!password.trim()) {
    errors.push('Password is required.');
  }
  if (password.includes(' ')) {
    errors.push('Password cannot contain spaces.');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    // prepare new user object for insertion into DB here
    res.status(201).json({ message: 'Registration successful' });
  }
});

module.exports = router;

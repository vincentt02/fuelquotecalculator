const Login = require('../models/Login_register')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let object_id = null;

const validate = (req, res, next) => {

    const { username, password } = req.body;
    const errors = [];

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
      next();
    }
}

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error:err
            })
        }
        Login.findOne({ username: req.body.username })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({
                    message: 'Username already exists. Please choose a different one.'
                })
            }
            let user = new Login ({
                username: req.body.username,
                password: hashedPass
            })
            user.save()
            .then(user => {
                res.json({
                    message: 'User Registered Successfully!',
                    id: user._id
                })
                object_id = user._id;
            })
            .catch(error => {
                res.json({
                    message: 'An error has occurred.'
                })
            })
        })
        .catch(error => {
            res.json({
                message: 'An error has occurred.'
            })
        })
    })
}

const login = (req, res, next) => {
    // Find the user with the given username
    Login.findOne({ username: req.body.username })
      .then(existingUser => {
        // If the user doesn't exist, send an error response
        if (!existingUser) {
          return res.status(400).json({ message: 'User not found.' });
        }
  
        // Compare the password provided with the stored password hash
        bcrypt.compare(req.body.password, existingUser.password, function(err, result) {
          // If there's an error in comparison other than passwords dont match, send an error response
          if (err) {
            return res.status(401).json({ message: 'Authentication failed.' });
          }
  
          // If the password is correct, generate a token and send a success response
          if (result) {
            const token = jwt.sign(
              {
                username: existingUser.username,
                userId: existingUser._id
              },
              process.env.JWT_KEY, //must include in env file in current environment
              { expiresIn: '1h' }
            );

            object_id = existingUser._id;
            return res.status(200).json({ message: 'Authentication successful.', token: token, id: existingUser._id });
          }
  
          // If the password is incorrect, send an error response
          return res.status(401).json({ message: 'Authentication failed. Password is incorrect.' });
        });
      })
      .catch(error => {
        // If there's an error while processing the request, send an error response
        res.json({ message: 'An error has occurred.' });
      });
  };
  

module.exports = {
    register,
    login,
    validate,
    object_id
}

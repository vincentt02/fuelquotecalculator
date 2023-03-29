const Login = require('../models/Login_register')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const validate = (req, res, next) => {

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
                    id: user._id // Return the _id value of the saved user document

                })
                const object_id = user._id;

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

module.exports = {
    register,
    validate,
    object_id
}
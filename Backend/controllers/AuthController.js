const Login = require('../models/Login_register')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
                return res.json({
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
                    message: 'User Registered Successfully!'
                })
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
    register
}
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
        let login = new Login ({
            username: req.body.username,
            password: hashedPass
        })
        login.save()
        .then(login => {
            res.json({
                message: 'User Registered Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error has occured.'
            })
        })
    })
}

module.exports = {
    register
}
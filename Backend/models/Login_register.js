const mongoose = require("mongoose");
const Schema = mongoose.Schema

const LoginSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    }
}, {timestamps: true} )

const Login = mongoose.model('Login', LoginSchema)
module.exports = Login 
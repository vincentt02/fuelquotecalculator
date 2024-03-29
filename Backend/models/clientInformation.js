const mongoose = require("mongoose");

const clientInformationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    addressOne: {
        type: String,
        required: true,
    },
    addressTwo: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    }
})

const clientInformation = mongoose.model("clientinformation", clientInformationSchema);

module.exports = { clientInformation }
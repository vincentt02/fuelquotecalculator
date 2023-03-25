const mongoose = require("mongoose");

const CPMFormSchema = new mongoose.Schema({
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
})

const CPMForm = mongoose.model("CPMForm", CPMFormSchema);

module.exports = { CPMForm }
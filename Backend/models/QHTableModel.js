const mongoose = require("mongoose")

const QuoteTableSchema = new mongoose.Schema({
    numG: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    due: {
        type: Number,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    }

}, { timestamps: true })


module.exports = mongoose.model('FuelQuote', QuoteTableSchema)
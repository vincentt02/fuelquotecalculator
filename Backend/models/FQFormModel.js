const mongoose = require("mongoose")

const FuelQuoteSchema = new mongoose.Schema({
    gallonsRequested: {
        type: Number,
        required: true,
    },
    dateRequested: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('FuelQuoteForm', FuelQuoteSchema)
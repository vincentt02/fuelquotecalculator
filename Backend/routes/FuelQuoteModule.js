const express = require("express");
const router = express.Router();

const {
    getClientData,
    getSuggestedPrice,
    submitFuelQuote
} = require('../controllers/fuelQuoteController')

// get client address for FQF
router.get("/address", getClientData);

// get suggested price
router.get("/suggestedprice", getSuggestedPrice);

// post gallons requested and delivery date
router.post("/", submitFuelQuote);

module.exports = router;
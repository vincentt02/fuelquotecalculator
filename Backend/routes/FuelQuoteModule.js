const express = require("express");
const router = express.Router();

const {
    getClientData,
    getSuggestedPrice,
    submitFuelQuote
} = require('../controllers/fuelQuoteController')

// get client address for FQF
router.get("/fuelquote/clientdata", getClientData);

// get suggested price
router.get("/fuelquote/suggestedprice", getSuggestedPrice);

// post gallons requested and delivery date
router.post("/fuelquote", submitFuelQuote);

module.exports = router;
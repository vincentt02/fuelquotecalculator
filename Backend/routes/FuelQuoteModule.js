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
router.get("/sugprice", getSuggestedPrice);

// post gallons requested and delivery date
router.post("/", submitFuelQuote);

router.post
module.exports = router;
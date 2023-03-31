const express = require("express");
const router = express.Router();

const {
    getUserId,
    getClientData,
    getSuggestedPrice,
    submitFuelQuote
} = require('../controllers/FuelQuoteController')

// post route to send token to the backend
router.post("/fuelquote/token", getUserId);

// get client address for FQF
router.get("/fuelquote/clientdata", getClientData);

// get suggested price
router.get("/fuelquote/suggestedprice", getSuggestedPrice);

// post gallons requested and delivery date
router.post("/fuelquote", submitFuelQuote);

module.exports = router;
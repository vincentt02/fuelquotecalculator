const express = require("express");
const router = express.Router();

const { getQuoteData } = require('../controllers/QuoteTableController')

// get client quote history for Quote Table
router.get("/quotetable/quotedata", getQuoteData);

module.exports = router;
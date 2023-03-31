const express = require("express");
const router = express.Router();

const { getQuoteData, getToken } = require('../controllers/QuoteTableController')

// get client quote history for Quote Table
router.get("/quotetable/quotedata", getQuoteData);

router.post("/quotetable/quotedata", getToken);

module.exports = router;
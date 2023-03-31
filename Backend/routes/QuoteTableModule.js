const express = require("express");
const router = express.Router();

const {
  getQuoteData,
  getUserID,
} = require("../controllers/QuoteTableController");

// get client quote history for Quote Table
router.get("/quotetable/quotedata", getQuoteData);

// get token and decode ID
router.post("/quotetable/quotedata", getUserID);

module.exports = router;

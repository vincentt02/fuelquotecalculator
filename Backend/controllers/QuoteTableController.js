const getQuoteData = async (req, res) => {
  // go into database
  // extract client quote history address (multiple quotes)
  // temp quote data used for now
  res.status(200).json([
    {
      numG: 20,
      address: "2701 Helena St",
      date: "05/16/2001",
      price: 2.14,
      due: 42.8,
    },
    {
      numG: 456,
      address: "3552 Travis St",
      date: "02/10/2001",
      price: 3.24,
      due: 1477.4,
    },
  ]);
  console.log("Quote History Extracted!");
};

module.exports = { getQuoteData };

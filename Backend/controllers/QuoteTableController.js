const Yup = require("yup");
const jwt = require("jsonwebtoken");

const fuelquoteModel = require("../models/fuelQuote.js");

var userID = null;

const quoteTableSchema = Yup.object({
  numG: Yup.number()
    .typeError("numG must be a number")
    .required("Number of gallons is required")
    .positive("Number of gallons must be a positive number"),
  address: Yup.string()
    .required("Address is required")
    .matches(/^\d+\s+\S.*$/, "Invalid address format"),
  date: Yup.string()
    .required("Date is required")
    .test(
      "valid-date",
      "Invalid date format, please use MM/DD/YYYY",
      function (value) {
        const regex =
          /^(0?[1-9]|1[012])[- \/.](0?[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;

        if (!regex.test(value)) {
          return false;
        }
        const [month, day, year] = value.split("/");
        const date = new Date(`${month}/${day}/${year}`);
        return date instanceof Date && !isNaN(date);
      }
    ),
  price: Yup.number()
    .typeError("price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number"),
  due: Yup.number()
    .typeError("due must be a number")
    .required("Due amount is required")
    .positive("Due amount must be a positive number"),
  userID: Yup.string().required("Missing userID"),
});

const getUserID = async (req, res) => {
  const decoded = jwt.decode(req.body.token);
  userID = decoded.userId;
  res.status(200).send("userID decoded");
};

const filterValidQuotes = async (quotes) => {
  const validQuotes = [];
  for (const quote of quotes) {
    try {
      await quoteTableSchema.validate(quote);
      validQuotes.push(quote);
    } catch (error) {
      // back end log (uncomment for debugging or unit testing)
      // console.error("Validation failed:", error.message, quote);
    }
  }
  return validQuotes;
};

const getQuoteData = async (req, res) => {
  const query = { userID: userID };

  const allData = await fuelquoteModel.find(query);
  const validQuotes = await filterValidQuotes(allData);

  res.status(200).json(validQuotes);
};

module.exports = {
  getQuoteData,
  quoteTableSchema,
  getUserID,
};

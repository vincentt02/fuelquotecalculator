const Yup = require("yup");
const jwt = require("jsonwebtoken");

var userId;

// date still needs some work i cant get the validation right
const fuelQuoteSchema = Yup.object({
  gallonsRequested: Yup.number()
    .typeError("gallonsRequested must be a number")
    .required("Gallons requested required")
    .min(1, "Gallons requested must be greater than 0"),
  dateRequested: Yup.string()
    .required("Delivery Date Required")
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
  token: Yup.string().required("Missing Token"),
});

const getUserId = async (req, res) => {
  const decoded = jwt.decode(req.body.token);
  userId = decoded;
  console.log(userId.userId);
  res.status(200).send({ data: "form received" });
};

const getClientData = async (req, res) => {
  // go into database
  // extract client profile data address
  // const decoded = jwt.decode(req.body.token)
  // console.log(decoded.userId)

  console.log(req.body);
  res.status(200).json({ clientAddress: "123 Main St Houston, TX 77001" });
  console.log("Client Address Extracted!");
};

const getSuggestedPrice = async (req, res) => {
  // i'll assume this will be completed in the backend,database
  // and i'll be able to also just extract from db
  res.status(200).json({ suggestedPrice: 1.5 });
  console.log("Suggested Price Calculated!");
};

const sendToDB = (body) => {};

const submitFuelQuote = (req, res) => {
  const fuelQuote = req.body;

  fuelQuoteSchema
    .validate(fuelQuote, {
      abortEarly: false,
    })
    .then((valid) => {
      res.status(200).send({ data: "form received" });
      console.log("Valid Form");
      console.log(req.body);
      sendToDB(fuelQuote);
    })
    .catch((err) => {
      console.log(err.errors);
      res.status(422).send(err.errors);
    });
};

module.exports = {
  getUserId,
  getClientData,
  getSuggestedPrice,
  submitFuelQuote,
  fuelQuoteSchema,
};

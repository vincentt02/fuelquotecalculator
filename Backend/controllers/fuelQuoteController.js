const Yup = require("yup");
const jwt = require("jsonwebtoken");
const { clientInformation } = require("../models/clientInformation.js");
const fuelQuote = require("../models/fuelQuote.js");
const pricingModule = require("../routes/PricingModule.js")

var userID = null;

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
  token: Yup.string().required("Missing token"),
});

const getUserID = async (req, res) => {
  const decoded = jwt.decode(req.body.token);
  userID = decoded.userId;
  res.status(200).send({ data: "userID decoded" });
};

const getClientData = async (req, res) => {
  // extract client profile data address
  const query = { userID: userID };
  const data = await clientInformation.findOne(query);

  if(!data?.addressOne) {
    res.status(422).send("")
    console.log("No address")
  }
  else {
  address = data.addressOne;
  res.status(200).json({ clientAddress: data.addressOne });
  }

};

const getSuggestedPrice = async (req, res) => {
  // i'll assume this will be completed in the backend,database
  const decoded = jwt.decode(req.body.token)
  const userID2 = decoded.userId;

  const pricing = new pricingModule(req.body, userID2);
  const suggestedPrice = await pricing.suggestedPrice();

  res.status(200).json({ suggestedPrice: suggestedPrice });
  console.log("Suggested Price Calculated!", suggestedPrice);
};

const sendToDB = async (req, res) => {
  // backend receives token twice bruhh
  const decoded = jwt.decode(req.body.token)
  const userID2 = decoded.userId;

  const pricing = new pricingModule(req.body, userID2);
  var suggestedPrice = await pricing.suggestedPrice();
  console.log("does it make it here?", suggestedPrice)

  const newQuote = fuelQuote({
    numG: req.body.gallonsRequested,
    address: req.body.address,
    date: req.body.dateRequested,
    price: suggestedPrice,
    due: suggestedPrice * req.body.gallonsRequested,
    userID: userID2,
  });

  const insertedQuote = await newQuote.save();
  return res.status(201).json(insertedQuote);
};

const submitFuelQuote = (req, res) => {
  const fuelQuote = req.body;

  fuelQuoteSchema
    .validate(fuelQuote, {
      abortEarly: false,
    })
    .then((valid) => {
      // res.status(200).send({ data: "form received" });
      console.log("Valid Form");
      console.log(req.body);
      sendToDB(req, res);
    })
    .catch((err) => {
      console.log('FIND ME IT JUST ERRORS UR SHIT BURH')
      console.log(err.errors);
      res.status(422).send(err.errors);
    });
};

module.exports = {
  getUserID,
  getClientData,
  getSuggestedPrice,
  submitFuelQuote,
  fuelQuoteSchema,
};

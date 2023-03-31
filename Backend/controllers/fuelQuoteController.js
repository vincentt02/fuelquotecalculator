const Yup = require("yup");
const jwt = require("jsonwebtoken");
const { clientInformation } = require("../models/clientInformation.js");
const fuelQuote = require("../models/fuelQuote.js");

var userId = null;

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

const getUserID = async (req, res) => {
  const decoded = jwt.decode(req.body.token);
  userId = decoded.userId;
  res.status(200).send({ data: "form received" });
};

const getClientData = async (req, res) => {
  // go into database
  // extract client profile data address
  const query = { userID: userId };
  const data = await clientInformation.findOne(query);

  address = data.addressOne;

  res.status(200).json({ clientAddress: data.addressOne });
};

const getSuggestedPrice = async (req, res) => {
  // i'll assume this will be completed in the backend,database
  // and i'll be able to also just extract from db
  res.status(200).json({ suggestedPrice: 1.5 });
  console.log("Suggested Price Calculated!");
};

const sendToDB = async (req, res) => {
  // const fuelQuote = new fuelquoteModel({
  //   numG: body.gallonsRequested,
  //   address: address, // add address data here
  //   date: body.dateRequested,
  //   price: 0, // add suggested price data here
  //   due: 0, // calculate due price here
  //   userID: userId,
  // });

  // console.log(body);
  const decoded = jwt.decode(req.body.token)
  const userID2 = decoded.userId;
  const newQuote = fuelQuote({
    numG: req.body.gallonsRequested,
    address: req.body.address,
    date: req.body.dateRequested,
    price: 0,
    due: 0,
    userID: userID2,
  });
  // console.log(newQuote);
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

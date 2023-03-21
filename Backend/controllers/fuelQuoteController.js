const Yup = require("yup");

// date still needs some work i cant get the validation right
const fuelQuoteSchema = Yup.object({
  gallonsRequested: Yup.number().required("Gallons requested required"),
  dateRequested: Yup.string()
    .required("Delivery Date Required")
    .test(
      "valid-date",
      "Invalid date format, please use MM-DD-YYYY",
      function (value) {
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        if (!regex.test(value)) {
          return false;
        }
        const [month, day, year] = value.split("-");
        const date = new Date(`${month}-${day}-${year}`);
        return date instanceof Date && !isNaN(date);
      }
    ),
});

const getClientData = async (req, res) => {
  // go into database
  // extract client profile data address
  res.status(200).json({ clientAddress: "123 Main St Houston, TX 77001" });
  console.log("Client Address Extracted!");
};

const getSuggestedPrice = async (req, res) => {
  // i'll assume this will be completed in the backend,database
  // and i'll be able to also just extract from db
  res.status(200).json({ suggestedPrice: "1.50" });
  console.log("Suggested Price Calculated!");
};

const submitFuelQuote = (req, res) => {
  const fuelQuote = req.body;

  fuelQuoteSchema
    .validate(fuelQuote)
    .catch((err) => {
      console.log(err.errors);
      res.status(422).send();
    })
    .then((valid) => {
      res.status(200).send({ data: "form received" });
      console.log("Valid Form");
      console.log(req.body);
    });
};

module.exports = {
  getClientData,
  getSuggestedPrice,
  submitFuelQuote,
};

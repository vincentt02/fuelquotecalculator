const Yup = require("yup");

const quoteHistoryArray = [
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
  {
    numG: 35,
    address: "123 Main St",
    date: "01/01/2022",
    price: 3.99,
    due: 139.65,
  },
  {
    numG: 18,
    address: "456 Maple Ave",
    date: "02/15/2022",
    price: 2.49,
    due: 44.82,
  },
  {
    numG: 60,
    address: "789 Elm St",
    date: "03/31/2022",
    price: 4.99,
    due: 299.4,
  },
  {
    numG: 40,
    address: "101 Oak St",
    date: "04/30/2022",
    price: 10,
    due: 400,
  },
  {
    numG: "invalid",
    address: "222 Pine St",
    date: "05/31/2022",
    price: 1.99,
    due: "invalid",
  },
  {
    numG: 10,
    address: 999,
    date: "06/30/2022",
    price: 5.49,
    due: 549,
  },
  {
    numG: 25,
    address: "444 Maple Ave",
    date: "tomorrow",
    price: "invalid",
    due: 500,
  },
  {
    numG: 30,
    address: "555 Oak St",
    date: "08/31/2022",
    price: "one hundred",
    due: 300,
  },
];
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
});

const filterValidQuotes = async (quotes) => {
  const validQuotes = [];
  for (const quote of quotes) {
    try {
      await quoteTableSchema.validate(quote);
      validQuotes.push(quote);
    } catch (error) {
      console.error("Validation failed:", error.message, quote);
    }
  }
  return validQuotes;
};

const getQuoteData = async (req, res) => {
  const validQuotes = await filterValidQuotes(quoteHistoryArray);
  res.status(200).json(validQuotes);
  console.log("Valid quotes extracted!");
};

module.exports = { getQuoteData };

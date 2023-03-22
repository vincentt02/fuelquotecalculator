const Yup = require("yup");

const stateOptions = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const formSchema = Yup.object({
    fullName: Yup.string()
      .required("Full Name Required")
      .max(50, "Full Name too long"),
    addressOne: Yup.string()
      .required("Address 1 Required")
      .max(100, "Address 1 too long"),
    addressTwo: Yup.string().max(100, "Address 2 too long"),
    city: Yup.string().required("City Required").max(100, "City too long"),
    state: Yup.string().required("State Required").oneOf(stateOptions, "Invalid State"),
    zipcode: Yup.string()
      .required("Zipcode Required")
      .min(5, "Zipcode too short")
      .max(9, "Zipcode too long"),
  });

const validateCPMForm = (req, res) => {
    const formData = req.body;
    formSchema
      .validate(formData, {
        abortEarly: false
      })
      .catch((err) => {
        res.status(422).json(err.errors)
        console.log(err.errors);
      })
      .then((valid) => {
        if (valid) {
          res.send({ data: "Form received" });
          console.log("Valid Form");
          console.log(req.body);
        }
      });
}

module.exports = validateCPMForm
const Yup = require("yup");

const formSchema = Yup.object({
    fullName: Yup.string()
      .required("Full Name Required")
      .max(50, "Full Name too long"),
    addressOne: Yup.string()
      .required("Address 1 Required")
      .max(100, "Address 1 too long"),
    addressTwo: Yup.string().max(100, "Address 2 too long"),
    city: Yup.string().required("City Required").max(100, "City too long"),
    state: Yup.string().required("State Required"),
    zipcode: Yup.string()
      .required("Zipcode Required")
      .min(5, "Zipcode too short")
      .max(9, "Zipcode too long"),
  });

const validateCPMForm = (req, res) => {
    const formData = req.body;
    formSchema
      .validate(formData)
      .catch((err) => {
        res.status(422).send();
        console.log(err.errors);
      })
      .then((valid) => {
        if (valid) {
          res.send({ data: "Form recieved" });
          console.log("Valid Form");
          console.log(req.body);
        }
      });
}

module.exports = validateCPMForm
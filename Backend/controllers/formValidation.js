const Yup = require("yup");

const formSchema  = Yup.object({
    username: Yup.string().required("User name required.").matches(/^\S*$/, "No spaces."),
    password: Yup.string().required("Password required.").matches(/^\S*$/, "No spaces.")

});

module.exports = formValidation;
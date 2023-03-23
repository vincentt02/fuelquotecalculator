const express = require("express");
const router = express.Router();
const Yup = require("yup");

const validateCPMForm = require("../controllers/ValidateCPMForm");



router.post("/", (req, res) => {
  validateCPMForm(req, res)
});

module.exports = router;

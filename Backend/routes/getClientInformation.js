const express = require("express");
const router = express.Router();
const Yup = require("yup");
const jwt = require("jsonwebtoken");
const { clientInformation } = require("../models/clientInformation.js");

const getClientInformation = async (req, res) => {
    const decoded = jwt.decode(req.body.token);
    userID = decoded.userId;

    const query = { userID: userID };
    const data = await clientInformation.findOne(query);
  
    if(data === null) {
      res.status(200).send(false)
      // console.log("No client information")
    }
    else {
        res.status(200).send(data)
      // console.log("Has client information")
    }
  };

router.post("/", (req, res) => {
    getClientInformation(req,res)
    
});

module.exports = router;

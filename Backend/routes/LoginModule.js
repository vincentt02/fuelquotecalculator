const express = require("express");
const router = express.Router()

router.post("/", (req, res) => {
    console.log("Running Login Post Route");

    const {username, password } = req.body;

    const errors = [];

    if (!username.trim()) {
        errors.push('Username is required.');
    }
      if (!password.trim()) {
        errors.push('Password is required.');
      }

      if(errors.length > 0){
        res.status(400).json({ errors });
      } else {
        res.status(201).json({ message: `Login successful`})
      }
});

module.exports = router;
const express = require("express");
const router = express.Router()

router.post("/", (req, res) => {
    console.log("Running Login Post Route");

    const {username, password } = req.body;

    res.status(201).json({ message: `Login successful, username: ${username}, password: ${password}`})
});

module.exports = router;
const express = require("express");
const router = express.Router()

router.post("/", (req, res) => {
    res.send({ data: "User Logged in"});
});

module.exports = router;
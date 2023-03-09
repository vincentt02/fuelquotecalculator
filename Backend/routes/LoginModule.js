const express = require("express");
const router = express.Router()

router.get("/", (req, res) => {
    res.send({ data: "User Logged in"});
});

module.exports = router;
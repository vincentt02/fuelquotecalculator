const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send({ data: "Form recieved" });
});

module.exports = router;

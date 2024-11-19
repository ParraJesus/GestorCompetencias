const express = require("express");

const router = express.Router();

//routes
router.get("/profile", (req, res) => {
  res.send("profile");
});

//export
module.exports = router;

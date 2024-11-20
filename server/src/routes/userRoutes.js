const express = require("express");

const router = express.Router();

//routes
router.get("/profile", (req, res) => {
  res.send("profileasdasddsa");
});

//export
module.exports = router;

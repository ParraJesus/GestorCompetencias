const express = require("express");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

// settings
app.set("appName", "CREA server");
app.set("port", 5000);

//middleware
app.use(express.json());
app.use(userRoutes);

module.exports = app;

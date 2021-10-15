const express = require("express");
const app = express();

// import modular router
const apiRouter = require("./apiRoute");
const htmlRouter = require("./htmlRoute");

app.use("./apiRoute", apiRouter);
app.use("./htmlRoute", htmlRouter);

module.exports = app;

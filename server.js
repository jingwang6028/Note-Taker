// require express
const express = require("express");
const app = express();

// require db folder
const dbData = require("./db/db.json");

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express static public folder
app.use(express.static("public"));

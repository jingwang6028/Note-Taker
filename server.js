// require express
const express = require("express");
const app = express();
const apiRouter = require("./routers/apiRoute");
const htmlRouter = require("./routers/htmlRoute");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express static public folder
app.use(express.static("public"));

app.use("/api", apiRouter);
app.use("/", htmlRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

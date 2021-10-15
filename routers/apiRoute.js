const router = require("express").Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");
// npm package - shortid
const shortid = require("shortid");

// GET router
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    res.json(JSON.parse(data));
  });
});

// Post router
router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  // if title and text is true
  if (title && text) {
    const newNote = {
      title,
      text,
      id: shortid.generate(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting new note");
  }
});

module.exports = router;

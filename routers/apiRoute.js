const router = require("express").Router();
// helper folder
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");
// npm package - shortid
const shortid = require("shortid");

const dbData = require("../db/db.json");

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

// delete requested note based on id
router.delete("/notes/:id", (req, res) => {
  const requestedId = req.params.id;

  const filterNote = dbData.filter((note) => {
    return note.id !== requestedId;
  });

  readAndAppend(filterNote, "./db/db.json");
});

module.exports = router;

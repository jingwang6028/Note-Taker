const router = require("express").Router();
const fs = require("fs");
// helper folder
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

// delete requested note based on id
router.delete("/notes/:id", (req, res) => {
  const requestedId = req.params.id;

  // read from db folder db.json file
  fs.readFile("./db/db.json", "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      const parseData = JSON.parse(data);

      const NoteData = parseData.filter((note) => {
        return note.id != requestedId;
      });
      writeToFile("./db/db.json", NoteData);
    }
  });
});

module.exports = router;

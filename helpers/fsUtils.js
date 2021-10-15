const fs = require("fs");
const util = require("util");

// read file
const readFromFile = util.promisify(fs.readFile);

// write file
const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), function (err) {
    if (err) throw err;
    console.log(`Data written to ${destination}`);
  });
};

// read and append file
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      const parseData = JSON.parse(data);
      parseData.push(content);
      writeToFile(file, parseData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };

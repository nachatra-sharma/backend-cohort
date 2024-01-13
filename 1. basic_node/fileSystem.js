const { isUtf8 } = require("buffer");
const fs = require("fs");

// sync
fs.writeFileSync("./sample.txt", "I am nachatra sharma");

// Async
fs.writeFile("./sample.txt", "I am piyush garg", (err, result) => {
  if (err) console.log("error", err);
  else console.log(result);
});

// Sync
const res = fs.readFileSync("./contact.txt", "utf-8");
console.log(res);

// Async

fs.readFile("./contact.txt", "utf-8", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

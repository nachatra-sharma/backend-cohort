const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello this is home page");
});

app.get("/about", (req, res) => {
  res.send(`hello ${req.query.name} and you are ${req.query.age} year's old.`);
});

app.listen(PORT, () => {
  console.log("server is up on port " + PORT);
});

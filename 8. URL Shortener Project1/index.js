const express = require("express");
const PORT = 3000;
const path = require("path");
const app = express();
const urlRoutes = require("./routes/url");
const { connectToMongoDB } = require("./connection.js");

// middlewares
app.use(express.json());
app.use("/url", urlRoutes);

// connect to DB
connectToMongoDB("mongodb://localhost:27017/short-url");

// setting views
app.set("view engine", "ejs"); //setting view engine as ejs
app.set("views", path.resolve("./views")); // telling my engine where my files are present

// server side rendering
app.get("/test", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});

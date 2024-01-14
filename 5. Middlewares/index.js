const express = require("express");
const PORT = 3000;
const data = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");

// middleware
app.use(express.urlencoded({ extended: false }));

// custom middleware
app.use((req, res, next) => {
  console.log("First middleware");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("hello from server");
});

// Get all user

app.get("/api/users", (req, res) => {
  res.status(200).json(data);
});

// Get all user (first name) in html

app.get("/users", (req, res) => {
  res.status(200).send(`
      <ul>
      ${data.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
  `);
});

// Get the user with it's id

app.get("/api/users/:id", (req, res) => {
  res.status(200).json(data[req.params.id - 1]);
});

app.post("/api/user", (req, res) => {
  // Create a new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.age ||
    !body.job_title ||
    !body.email
  ) {
    res.status(400).json({ "something went wrong": "put everything" });
  }
  data.push({ id: data.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err, result) => {
    res.json({ status: "success", id: data.length });
  });
  res.setHeader("x-name", "piyush garg");
});

app.patch("/api/users/:id", (req, res) => {
  // Edit a user with id
  const userId = Number(req.params.id);
  const body = req.body;

  data[userId - 1] = { id: userId, ...body };

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err, result) => {
    if (err) {
      res.send(`Error occurred" ${err}`);
    } else {
      res.json({ status: "success", id: userId });
    }
  });
});

app.delete("/api/users/:id", (req, res) => {
  // Delete a user with id
  const userId = Number(req.params.id);
  data.splice([userId - 1], 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err, result) => {
    if (err) {
      res.send(`error occurred: ${err}`);
    } else {
      res.json({ status: "successful" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is started at PORT ${PORT}`);
});

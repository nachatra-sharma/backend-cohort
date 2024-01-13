const express = require("express");
const PORT = 3000;
const data = require("./MOCK_DATA.json");
const app = express();

app.get("/", (req, res) => {
res.send("hello from server");
});

// Get all user

app.get("/api/users", (req, res) => {
res.json(data);
});

// Get all user (first name) in html

app.get("/users", (req, res) => {
res.send(`      <ul>
      ${data.map((user) =>`<li>${user.first_name}</li>`).join("")}
      </ul>
  `);
});

app.listen(PORT, () => {
console.log(`Server is started at PORT ${PORT}`);
});

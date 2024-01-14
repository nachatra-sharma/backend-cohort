const express = require("express");
const PORT = 3000;
const app = express();
const mongoose = require("mongoose");

// schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// model

const User = mongoose.model("user", userSchema);

// connection

mongoose
  .connect(`mongodb://127.0.0.1:27017/User`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error", err));

// middleware
app.use(express.urlencoded({ extended: false }));

// Get all user

app
  .route("/api/users")
  .get(async (req, res) => {
    const user = await User.find({});
    res.status(200).json(user);
  })
  .post(async (req, res) => {
    // Create a new user
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.job_title ||
      !body.gender
    ) {
      res.status(400).json({ "something went wrong": "put everything" });
    } else {
      const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
      });
      console.log(result);
      return res.status(201).json({ msg: "success" });
    }
  });

// Get all user (first name) in html

app.get("/users", async (req, res) => {
  const allUser = await User.find({});
  res.status(200).send(`
      <ul>
      ${allUser.map((user) => `<li>${user.firstName}</li>`).join("")}
      </ul>
  `);
});

app
  .route("/api/users/:id")
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "kumar" });
    res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "success" });
  })
  .get(async (req, res) => {
    const userById = await User.findById(req.params.id);
    res.status(200).json(userById);
  });

app.listen(PORT, () => {
  console.log(`Server is started at PORT ${PORT}`);
});

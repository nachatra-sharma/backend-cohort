const User = require("../models/user.js");

async function getAllUser(req, res) {
  const user = await User.find({});
  res.status(200).json(user);
}

async function createNewUser(req, res) {
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
    return res.status(201).json({ msg: "success", id: result._id });
  }
}

async function updateUserByID(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "kumar" });
  res.json({ status: "success" });
}

async function deleteUserByID(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "success" });
}

async function getUserByID(req, res) {
  const userById = await User.findById(req.params.id);
  res.status(200).json(userById);
}

module.exports = {
  getAllUser,
  createNewUser,
  getUserByID,
  deleteUserByID,
  updateUserByID,
};

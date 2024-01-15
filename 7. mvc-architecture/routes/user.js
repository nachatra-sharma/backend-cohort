const express = require("express");

const {
  getAllUser,
  createNewUser,
  getUserByID,
  deleteUserByID,
  updateUserByID,
} = require("../controllers/user.js");

const router = express.Router();

router.route("/").get(getAllUser).post(createNewUser);

router
  .route("/:id")
  .patch(updateUserByID)
  .delete(deleteUserByID)
  .get(getUserByID);

module.exports = router;

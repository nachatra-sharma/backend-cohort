const express = require("express");

const router = express.Router();
const {
  generateNewShortURL,
  redirectToURL,
  analytics,
} = require("../controllers/url");
router.post("/", generateNewShortURL);
router.get("/:shortId", redirectToURL);
router.get("/analytics/:shortId", analytics);

module.exports = router;

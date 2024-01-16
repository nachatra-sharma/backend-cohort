const URL = require("../Models/url");
const shortid = require("shortid");

async function generateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitedHistory: [],
  });
  return res.render("home", { id: shortID });
}

async function redirectToURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

async function analytics(req, res) {
  const shortId = req.params.shortId;
  const data = await URL.findOne({
    shortId,
  });
  return res.json({
    clicks: data.visitHistory.length,
    analytics: data.visitHistory,
  });
}

// async function

module.exports = {
  generateNewShortURL,
  redirectToURL,
  analytics,
};

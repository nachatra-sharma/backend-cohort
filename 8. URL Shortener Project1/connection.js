const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("mongodb connected"))
    .catch(() => console.log("error occured"));
}

module.exports = {
  connectToMongoDB,
};

const express = require("express");
const PORT = 3000;
const app = express();
const { connectMongoDB } = require("./connection.js");
const userRouter = require("./routes/user.js");

// connection
connectMongoDB("mongodb://127.0.0.1:27017/User");

// middlewares
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is started at PORT ${PORT}`);
});

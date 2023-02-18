const express = require("express");
const mongoose = require("mongoose").default;
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes")
require('dotenv').config();

const server = express();
server.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODBURI)
  .then(() => server.listen(process.env.PORT, () => console.log("Connected")))
  .catch((err) => console.log(err));

// server.use(express.static("public"));
// server.use(express.urlencoded({ extended: true }));

server.use("/api/user", userRoutes);

server.use("/api/test", testRoutes);

server.use("/api/auth", authRoutes);

server.get("/", (req, res) => {
  res.send("<p>Home Page</p>");
});

const express = require("express");
const mongoose = require("mongoose").default;
const userRoutes = require("./routes/userRoutes");
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

server.get("/", (req, res) => {
  res.send("<p>Home Page</p>");
});

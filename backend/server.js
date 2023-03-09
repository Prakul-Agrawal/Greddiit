const express = require("express");
const mongoose = require("mongoose").default;
const userRoutes = require("./routes/userRoutes");
const subgreddiitRoutes = require("./routes/subgreddiitRoutes");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config();

const server = express();
server.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODBURI)
  .then(() => server.listen(process.env.PORT, () => console.log("Connected")))
  .catch((err) => console.log(err));

server.use("/api/user", userRoutes);

server.use("/api/subgreddiit", subgreddiitRoutes);

server.use("/api/post", postRoutes);

server.get("/", (req, res) => {
  res.send("<p>Home Page</p>");
});

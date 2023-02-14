const express = require("express");
const mongoose = require("mongoose").default;
const userRoutes = require("./routes/userRoutes");

const server = express();
server.use(express.json());

const dbURI =
  "mongodb+srv://greddiit:assignment@dass.oiqw9sb.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI)
  .then(() => server.listen(5000, () => console.log("Connected")))
  .catch((err) => console.log(err));

// server.use(express.static("public"));
// server.use(express.urlencoded({ extended: true }));

server.use("/user", userRoutes);

server.get("/", (req, res) => {
  res.send("<p>Home Page</p>");
});

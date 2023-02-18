const express = require("express");
const auth = require("../middleware/auth");
const testController = require("../controllers/testController");

const router = express.Router();

router.get("/", auth, testController.find_user);

module.exports = router;

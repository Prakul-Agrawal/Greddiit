const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, userController.get_user);

router.post("/register", userController.register_user);

router.post("/login", userController.login_user);

router.patch("/", auth, userController.update_user);

router.patch("/follower/remove", auth, userController.remove_follower);

router.patch("/following/unfollow", auth, userController.unfollow);

router.patch("/following/follow", auth, userController.follow);

module.exports = router;

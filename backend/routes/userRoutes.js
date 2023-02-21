const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// router.get("/", userController.create_user_get);

// router.post("/", userController.create_user_post);

// router.get("/all", userController.display_all);
//
// router.get("/single", userController.display_one);
//
// router.get("/:id", userController.display_by_id);
//
// router.delete("/:id", userController.delete_by_id);

router.get("/", auth, userController.get_user);

router.post("/register", userController.register_user);

router.post("/login", userController.login_user);

router.patch("/", auth, userController.update_user);

router.patch("/follower/remove", auth, userController.remove_follower);

router.patch("/follower/add", auth, userController.add_follower);

router.patch("/following/unfollow", auth, userController.unfollow);

router.patch("/following/follow", auth, userController.follow);

module.exports = router;

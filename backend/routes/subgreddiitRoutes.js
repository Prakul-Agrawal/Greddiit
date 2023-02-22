const express = require("express");
const subgreddiitController = require("../controllers/subgreddiitController");
const auth = require("../middleware/auth");

const router = express.Router();

// router.get("/", auth, userController.get_user);

router.post("/create", auth, subgreddiitController.createSubgreddiit);

router.get("/notjoined", auth, subgreddiitController.getNotJoinedSubgreddiits);

router.get("/:name", auth, subgreddiitController.getSubgreddiitByName);

router.patch("/leave", auth, subgreddiitController.leaveSubgreddiits);

// router.post("/login", userController.login_user);

// router.patch("/", auth, userController.update_user);

// router.patch("/follower/remove", auth, userController.remove_follower);

// router.patch("/follower/add", auth, userController.add_follower);

// router.patch("/following/unfollow", auth, userController.unfollow);

// router.patch("/following/follow", auth, userController.follow);

module.exports = router;

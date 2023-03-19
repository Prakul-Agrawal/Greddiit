const express = require("express");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/create", auth, postController.createPost);

router.get("/saved", auth, postController.getSavedPosts);

router.patch("/upvote", auth, postController.upvotePost);

router.patch("/downvote", auth, postController.downvotePost);

router.patch("/removeupvote", auth, postController.removeUpvote);

router.patch("/removedownvote", auth, postController.removeDownvote);

router.patch("/savepost", auth, postController.savePost);

router.patch("/unsavepost", auth, postController.removeSavedPost);

router.post("/comment", auth, postController.createComment);

module.exports = router;

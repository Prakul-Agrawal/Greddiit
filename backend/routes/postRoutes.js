const express = require("express");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/create", auth, postController.createPost);
//
// router.get("/notjoined", auth, subgreddiitController.getNotJoinedSubgreddiits);
//
// router.get("/sort/:sort_type", subgreddiitController.sortSubgreddiits);
//
// router.get("/:name", auth, subgreddiitController.getSubgreddiitByName);
//
router.patch("/upvote", auth, postController.upvotePost);

router.patch("/downvote", auth, postController.downvotePost);

router.patch("/removeupvote", auth, postController.removeUpvote);

router.patch("/removedownvote", auth, postController.removeDownvote);

router.patch("/savepost", auth, postController.savePost);

router.patch("/unsavepost", auth, postController.removeSavedPost);

module.exports = router;

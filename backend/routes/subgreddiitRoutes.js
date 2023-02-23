const express = require("express");
const subgreddiitController = require("../controllers/subgreddiitController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/create", auth, subgreddiitController.createSubgreddiit);

router.get("/notjoined", auth, subgreddiitController.getNotJoinedSubgreddiits);

router.get("/:name", auth, subgreddiitController.getSubgreddiitByName);

router.patch("/leave", auth, subgreddiitController.leaveSubgreddiits);

router.patch("/joinrequest", auth, subgreddiitController.sendJoinRequest);

router.patch("/acceptrequest", auth, subgreddiitController.acceptJoinRequest);

router.patch("/rejectrequest", auth, subgreddiitController.rejectJoinRequest);

module.exports = router;

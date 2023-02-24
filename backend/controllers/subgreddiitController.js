const Subgreddiit = require("../models/Subgreddiit");
const User = require("../models/User");

const createSubgreddiit = async (req, res) => {
  const { name, description, tags, banned } = req.body;

  try {
    const temp_subgreddiit = await Subgreddiit.findOne({ name });

    if (temp_subgreddiit) {
      return res.status(400).json({ msg: "Subgreddiit already exists" });
    }

    const split_tags = tags.split(" ");
    // console.log(split_tags);
    const lower_tags = split_tags.map((word) => word.toLowerCase());
    const split_banned = banned.split(" ");
    const lower_banned = split_banned.map((word) => word.toLowerCase());

    // console.log(req.user.id);

    const subgreddiit = new Subgreddiit({
      name,
      description,
      tags: lower_tags,
      banned: lower_banned,
      moderator: req.user.id,
      followers: [req.user.id],
    });

    // console.log(subgreddiit);

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          moderated_subgreddiits: subgreddiit._id,
          joined_subgreddiits: subgreddiit._id,
        },
      }
    );

    // console.log("1234");

    await subgreddiit.save();

    // console.log("hello");
    res.status(200).send("Subgreddiit created");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getSubgreddiitByName = async (req, res) => {
  try {
    const name = req.params.name;
    // uncomment after implementing posts
    // const subgreddiit = await Subgreddiit.findOne({ name }).populate("posts");
    const subgreddiit = await Subgreddiit.findOne({ name })
      .populate("followers")
      .populate("join_requests");
    if (!subgreddiit) {
      return res.status(404).json({ msg: "Subgreddiit does not exist" });
    }
    res.status(200).json(subgreddiit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getNotJoinedSubgreddiits = async (req, res) => {
  try {
    // console.log("Hello hi");
    const user = await User.findById(req.user.id);
    // console.log(user);
    const subgreddiits = await Subgreddiit.find({
      _id: { $nin: user.joined_subgreddiits },
    });
    // console.log(subgreddiits);
    res.status(200).json(subgreddiits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const sortSubgreddiits = async (req, res) => {
  try {
    const sort_type = req.params.sort_type;
    // console.log("Hello hi");
    // const user = await User.findById(req.user.id);
    // console.log(typeof sort_type);
    let subgreddiits;
    if (sort_type === "name_asc") {
      // console.log("213121");
      subgreddiits = await Subgreddiit.find({}).sort({ name: 1 });
    } else if (sort_type === "name_desc") {
      subgreddiits = await Subgreddiit.find({}).sort({ name: -1 });
    } else if (sort_type === "follow") {
      subgreddiits = await Subgreddiit.find({}).sort({
        followers_count: -1,
      });
    } else if (sort_type === "creation") {
      subgreddiits = await Subgreddiit.find({}).sort({ createdAt: -1 });
    } else {
      return res.status(400).json({ msg: "Incorrect sorting type" });
    }
    // console.log("here");
    // console.log(subgreddiits);
    res.status(200).json(subgreddiits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const leaveSubgreddiits = async (req, res) => {
  try {
    const temp_user = await User.findOne({
      _id: req.user.id,
      moderated_subgreddiits: req.body.id,
    });

    if (temp_user) {
      return res
        .status(400)
        .json({ msg: "Moderator cannot leave subgreddiit" });
    }

    const subgreddiit = await Subgreddiit.findOne({
      _id: req.body.id,
      followers: req.user.id,
    });

    if (!subgreddiit) {
      return res.status(400).json({ msg: "Already not following subgreddiit" });
    }
    // console.log("Hello hi");
    // const user = await User.findById(req.user.id);

    await Subgreddiit.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: { followers: req.user.id },
        $inc: { followers_count: -1 },
        $push: { exited_users: req.user.id },
      }
    );

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: { joined_subgreddiits: req.body.id },
      }
    );

    res.status(200).json("Left subgreddiit");

    // console.log(user);

    // console.log(subgreddiits);
    // res.status(200).json(subgreddiits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const sendJoinRequest = async (req, res) => {
  try {
    const subgreddiit1 = await Subgreddiit.findOne({
      _id: req.body.id,
      followers: req.user.id,
    });

    if (subgreddiit1) {
      return res.status(400).json({ msg: "Already following subgreddiit" });
    }

    const subgreddiit2 = await Subgreddiit.findOne({
      _id: req.body.id,
      join_requests: req.user.id,
    });

    if (subgreddiit2) {
      return res
        .status(400)
        .json({ msg: "Previous join request is still pending" });
    }

    const subgreddiit3 = await Subgreddiit.findOne({
      _id: req.body.id,
      exited_users: req.user.id,
    });

    if (subgreddiit3) {
      return res
        .status(400)
        .json({ msg: "Cannot join subgreddiit again after leaving it" });
    }

    await Subgreddiit.findOneAndUpdate(
      { _id: req.body.id },
      {
        $push: { join_requests: req.user.id },
      }
    );

    res.status(200).json("Sent join request");

    // console.log(user);

    // console.log(subgreddiits);
    // res.status(200).json(subgreddiits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const acceptJoinRequest = async (req, res) => {
  try {
    const temp_user = await User.findOne({
      _id: req.user.id,
      moderated_subgreddiits: req.body.id,
    });

    if (!temp_user) {
      return res
        .status(400)
        .json({ msg: "Only Moderators can accept join requests" });
    }

    const subgreddiit = await Subgreddiit.findOne({
      _id: req.body.id,
      join_requests: req.body.user_id,
    });

    if (!subgreddiit) {
      return res.status(400).json({ msg: "No such join request" });
    }

    await Subgreddiit.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: { join_requests: req.body.user_id },
        $push: { followers: req.body.user_id },
        $inc: { followers_count: 1 },
      }
    );

    await User.findOneAndUpdate(
      { _id: req.body.user_id },
      {
        $push: { joined_subgreddiits: req.body.id },
      }
    );

    res.status(200).json("Join request accepted");

    // console.log(user);

    // console.log(subgreddiits);
    // res.status(200).json(subgreddiits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const rejectJoinRequest = async (req, res) => {
  try {
    const temp_user = await User.findOne({
      _id: req.user.id,
      moderated_subgreddiits: req.body.id,
    });

    if (!temp_user) {
      return res
        .status(400)
        .json({ msg: "Only Moderators can reject join requests" });
    }

    const subgreddiit = await Subgreddiit.findOne({
      _id: req.body.id,
      join_requests: req.body.user_id,
    });

    if (!subgreddiit) {
      return res.status(400).json({ msg: "No such join request" });
    }

    await Subgreddiit.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: { join_requests: req.body.user_id },
      }
    );

    res.status(200).json("Join request rejected");

    // console.log(user);

    // console.log(subgreddiits);
    // res.status(200).json(subgreddiits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createSubgreddiit,
  getSubgreddiitByName,
  getNotJoinedSubgreddiits,
  leaveSubgreddiits,
  sendJoinRequest,
  acceptJoinRequest,
  rejectJoinRequest,
  sortSubgreddiits,
};

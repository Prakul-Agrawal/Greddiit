const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register_user = async (req, res) => {
  const { first_name, last_name, username, password, age, contact_no, email } =
    req.body;

  try {
    const temp_user_username = await User.findOne({ username });

    if (temp_user_username) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const temp_user_email = await User.findOne({ email });

    if (temp_user_email) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const user = new User({
      first_name,
      last_name,
      username,
      password,
      age,
      contact_no,
      email,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    user.password = undefined;

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login_user = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    user.password = undefined;

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const get_user = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("followers")
      .populate("following")
      .populate("joined_subgreddiits")
      .populate("moderated_subgreddiits");
    user.password = undefined;
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const update_user = async (req, res) => {
  try {
    const user_by_email = await User.findOne({ email: req.body.email });
    const user_by_email_username = await User.findOne({
      email: req.body.email,
      username: req.body.username,
    });
    if (!user_by_email_username && user_by_email) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    await User.findOneAndUpdate({ username: req.body.username }, req.body);
    res.status(200).json("User updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const remove_follower = async (req, res) => {
  try {
    const found = await User.find({
      _id: req.user.id,
      followers: req.body.id,
    });
    if (!found.length) {
      return res.status(400).json({ msg: "Already not followed" });
    }

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: { followers: req.body.id },
        $inc: { followers_count: -1 },
      }
    );

    await User.findOneAndUpdate(
        { _id: req.body.id },
        {
          $pull: { following: req.user.id },
          $inc: { following_count: -1 },
        }
    );

    res.status(200).json("Follower removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const unfollow = async (req, res) => {
  try {
    const found = await User.find({
      _id: req.user.id,
      following: req.body.id,
    });
    if (!found.length) {
      return res.status(400).json({ msg: "Already not following" });
    }

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: { following: req.body.id },
        $inc: { following_count: -1 },
      }
    );

    await User.findOneAndUpdate(
        { _id: req.body.id },
        {
          $pull: { followers: req.user.id },
          $inc: { followers_count: -1 },
        }
    );

    res.status(200).json("Unfollowed user");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const follow = async (req, res) => {
  try {
    if (req.user.id === req.body.id) {
      return res.status(400).json({ msg: "Cannot follow yourself" });
    }

    const found = await User.find({
      _id: req.user.id,
      following: req.body.id,
    });
    if (found.length) {
      return res.status(400).json({ msg: "Already following" });
    }

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: { following: req.body.id },
        $inc: { following_count: 1 },
      }
    );

    await User.findOneAndUpdate(
        { _id: req.body.id },
        {
          $push: { followers: req.user.id },
          $inc: { followers_count: 1 },
        }
    );

    res.status(200).json("Followed user");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  get_user,
  update_user,
  login_user,
  remove_follower,
  register_user,
  follow,
  unfollow,
};

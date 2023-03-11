const Subgreddiit = require("../models/Subgreddiit");
const User = require("../models/User");
const Post = require("../models/Post");

const createPost = async (req, res) => {
  const { text, posted_by_id, posted_by_name, posted_in } = req.body;

  try {
    if (posted_by_id !== req.user.id) {
      return res.status(400).json({ msg: "Do not impersonate someone else" });
    }

    const temp_subgreddiit = await Subgreddiit.findOne({
      _id: posted_in,
      followers: posted_by_id,
    });

    if (!temp_subgreddiit) {
      return res.status(400).json({
        msg: "User does not have permission to post in this subgreddiit",
      });
    }

    console.log(temp_subgreddiit.banned);

    let containsBannedWords = false,
      substring = "",
      substringLen = 0,
      index = 0,
      startIndex = 0,
      indices = [];
    const lowercaseText = text.toLowerCase();

    for (let i = 0; i < temp_subgreddiit.banned.length; ++i) {
      substring = temp_subgreddiit.banned[i];
      substringLen = substring.length;
      if (lowercaseText.includes(substring)) {
        containsBannedWords = true;
        startIndex = 0;
        while ((index = lowercaseText.indexOf(substring, startIndex)) > -1) {
          indices.push([index, substringLen]);
          startIndex = index + substringLen;
        }
      }
    }

    let tempStr = text;

    if (containsBannedWords) {
      for (let i = 0; i < indices.length; ++i) {
        tempStr =
          tempStr.substring(0, indices[i][0]) +
          "*".repeat(indices[i][1]) +
          tempStr.substring(indices[i][0] + indices[i][1], tempStr.length);
      }
    }

    const post = new Post({
      text: tempStr,
      posted_by_id,
      posted_by_name,
      posted_in,
    });

    await Subgreddiit.findOneAndUpdate(
      { _id: posted_in },
      {
        $push: { posts: post._id },
        $inc: { posts_count: 1 },
      }
    );

    await User.findOneAndUpdate(
      { _id: posted_by_id },
      {
        $push: { posts: post._id },
      }
    );

    await post.save();

    if (containsBannedWords) {
      return res.status(200).send("Post created, however it contains banned words");
    }
    res.status(200).send("Post created");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const upvotePost = async (req, res) => {
  try {
    const temp_post1 = await Post.findById(req.body.id);

    if (!temp_post1) {
      return res.status(400).json({ msg: "No such post exists" });
    }

    const temp_subgreddiit = await Subgreddiit.findOne({
      _id: temp_post1.posted_in,
      followers: req.user.id,
    });

    if (!temp_subgreddiit) {
      return res.status(400).json({
        msg: "User does not have permission to upvote this post",
      });
    }

    const temp_post2 = await Post.findOne({
      _id: req.body.id,
      upvote_users: req.user.id,
    });

    if (temp_post2) {
      return res.status(400).json({ msg: "Already upvoted this post" });
    }

    await Post.findOneAndUpdate(
      { _id: req.body.id },
      {
        $push: { upvote_users: req.user.id },
        $inc: { upvotes: 1 },
      }
    );

    const temp_post3 = await Post.findOne({
      _id: req.body.id,
      downvote_users: req.user.id,
    });

    if (temp_post3) {
      await Post.findOneAndUpdate(
        { _id: req.body.id },
        {
          $pull: { downvote_users: req.user.id },
          $inc: { downvotes: -1 },
        }
      );
    }

    res.status(200).json("Upvoted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const downvotePost = async (req, res) => {
  try {
    const temp_post1 = await Post.findById(req.body.id);

    if (!temp_post1) {
      return res.status(400).json({ msg: "No such post exists" });
    }

    const temp_subgreddiit = await Subgreddiit.findOne({
      _id: temp_post1.posted_in,
      followers: req.user.id,
    });

    if (!temp_subgreddiit) {
      return res.status(400).json({
        msg: "User does not have permission to downvote this post",
      });
    }

    const temp_post2 = await Post.findOne({
      _id: req.body.id,
      downvote_users: req.user.id,
    });

    if (temp_post2) {
      return res.status(400).json({ msg: "Already downvoted this post" });
    }

    await Post.findOneAndUpdate(
      { _id: req.body.id },
      {
        $push: { downvote_users: req.user.id },
        $inc: { downvotes: 1 },
      }
    );

    const temp_post3 = await Post.findOne({
      _id: req.body.id,
      upvote_users: req.user.id,
    });

    if (temp_post3) {
      await Post.findOneAndUpdate(
        { _id: req.body.id },
        {
          $pull: { upvote_users: req.user.id },
          $inc: { upvotes: -1 },
        }
      );
    }

    res.status(200).json("Downvoted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const removeUpvote = async (req, res) => {
  try {
    const temp_post1 = await Post.findById(req.body.id);

    if (!temp_post1) {
      return res.status(400).json({ msg: "No such post exists" });
    }

    const temp_post2 = await Post.findOne({
      _id: req.body.id,
      upvote_users: req.user.id,
    });

    if (!temp_post2) {
      return res.status(400).json({ msg: "No such upvote in the first place" });
    }

    await Post.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: { upvote_users: req.user.id },
        $inc: { upvotes: -1 },
      }
    );

    res.status(200).json("Removed upvote");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const removeDownvote = async (req, res) => {
  try {
    const temp_post1 = await Post.findById(req.body.id);

    if (!temp_post1) {
      return res.status(400).json({ msg: "No such post exists" });
    }

    const temp_post2 = await Post.findOne({
      _id: req.body.id,
      downvote_users: req.user.id,
    });

    if (!temp_post2) {
      return res
        .status(400)
        .json({ msg: "No such downvote in the first place" });
    }

    await Post.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: { downvote_users: req.user.id },
        $inc: { downvotes: -1 },
      }
    );

    res.status(200).json("Removed downvote");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const savePost = async (req, res) => {
  try {
    const temp_post = await Post.findById(req.body.id);

    if (!temp_post) {
      return res.status(400).json({ msg: "No such post exists" });
    }

    const temp_subgreddiit = await Subgreddiit.findOne({
      _id: temp_post.posted_in,
      followers: req.user.id,
    });

    if (!temp_subgreddiit) {
      return res.status(400).json({
        msg: "User does not have permission to save this post",
      });
    }

    const temp_user = await User.findOne({
      _id: req.user.id,
      saved_posts: req.body.id,
    });

    if (temp_user) {
      return res.status(400).json({ msg: "Already saved this post" });
    }

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: { saved_posts: req.body.id },
      }
    );

    res.status(200).json("Post saved");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const removeSavedPost = async (req, res) => {
  try {
    const temp_post = await Post.findById(req.body.id);

    if (!temp_post) {
      return res.status(400).json({ msg: "No such post exists" });
    }

    const temp_subgreddiit = await Subgreddiit.findOne({
      _id: temp_post.posted_in,
      followers: req.user.id,
    });

    if (!temp_subgreddiit) {
      return res.status(400).json({
        msg: "User does not have permission to remove this saved post",
      });
    }

    const temp_user = await User.findOne({
      _id: req.user.id,
      saved_posts: req.body.id,
    });

    if (!temp_user) {
      return res
        .status(400)
        .json({ msg: "Post is not saved in the first place" });
    }

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: { saved_posts: req.body.id },
      }
    );

    res.status(200).json("Post removed from saved list");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "saved_posts",
      populate: { path: "posted_in" },
    });
    res.status(200).json({ saved_posts: user.saved_posts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createPost,
  upvotePost,
  downvotePost,
  removeUpvote,
  removeDownvote,
  savePost,
  removeSavedPost,
  getSavedPosts,
};

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    posted_by_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    posted_by_name: {
      type: String,
      required: true,
    },
    posted_in: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subgreddiit",
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    upvote_users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    downvote_users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model("Post", PostSchema);

const mongoose = require("mongoose");

const SubgreddiitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    banned: {
      type: [String],
    },
    moderator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    followers_count: {
      type: Number,
      default: 1,
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
    },
    posts_count: {
      type: Number,
      default: 0,
    },
    blocked_users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    reports: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Report",
    },
    join_requests: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    exited_users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = Subgreddiit = mongoose.model("Subgreddiit", SubgreddiitSchema);

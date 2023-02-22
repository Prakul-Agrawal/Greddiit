const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    contact_no: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    followers_count: {
      type: Number,
      default: 0,
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    following_count: {
      type: Number,
      default: 0,
    },
    moderated_subgreddiits: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subgreddiit",
    },
    joined_subgreddiits: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subgreddiit",
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
    },
    saved_posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);

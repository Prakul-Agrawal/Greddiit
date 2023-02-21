const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reported_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reported_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    concern: {
      type: String,
      required: true,
    },
    post_associated: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    subgreddiit_associated: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subgreddiit",
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = Report = mongoose.model("Report", reportSchema);

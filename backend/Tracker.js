const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  day: Number,
  leetcode: Array,
  ecommerce: Array,
  extra: Array,
  sleep: String,
  wake: String,
  thoughts: String
}, { timestamps: true });

module.exports = mongoose.model("Tracker", TrackerSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Posts = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  topic: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  author: {
    type: String,
    default: ""
  },
  account: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Posts", Posts);

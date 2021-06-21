const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  tags: {
    type: [String],
    required: true,
  },

  thumbnail: {
    type: String,
    required: true,
  },

  hidden: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);

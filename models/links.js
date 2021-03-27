const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  links: {
    type: String,
  },
});

module.exports = mongoose.model("link-share", linkSchema);

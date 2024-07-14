const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  description: { type: String },
  isComplete: { type: Boolean },
});

module.exports = mongoose.model("course", courseSchema);

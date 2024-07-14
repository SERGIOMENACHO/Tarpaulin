const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  id: { type: String },
  courseId: { type: String },
  title: { type: String },
  content: { type: String },
  createdAt: { type: String },
});

module.exports = mongoose.model("lesson", lessonSchema);

const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  enrollmentId: { type: String },
  description: { type: String },
  createdAt: { type: String },
  status: { type: String },
});

module.exports = mongoose.model("enrollment", enrollmentSchema);

const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Teacher", teacherSchema);

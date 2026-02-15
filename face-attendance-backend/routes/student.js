const express = require("express");
const router = express.Router();
const multer = require("multer");
const Student = require("../models/student");

const storage = multer.diskStorage({
  destination: "uploads/students",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/register",
  upload.single("photo"),
  async (req, res) => {
    try {
      const { name, rollNo } = req.body;

      if (!req.file) {
        return res.status(400).json({ msg: "Photo is required" });
      }

      const student = new Student({
        name,
        rollNo,
        photo: req.file.filename,
      });

      await student.save();

      res.json({ msg: "Student registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: err.message });
    }
  }
);

module.exports = router;

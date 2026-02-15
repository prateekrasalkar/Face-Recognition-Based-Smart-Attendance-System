// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email, password });
    if (!teacher) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: teacher._id }, "SECRET_KEY");
    res.json({ token });
});

module.exports = router;

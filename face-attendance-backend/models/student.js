const express = require("express");
const router = express.Router();

// TEMP dummy attendance data (to fix fetch error)
router.get("/attendance", async (req, res) => {
    res.json([
        {
            student_id: "101",
            name: "Test Student",
            date: "2026-02-03",
            time: "10:30 AM"
        }
    ]);
});

router.post("/attendance", async (req, res) => {
    res.json({ message: "Attendance process started" });
});

module.exports = router;

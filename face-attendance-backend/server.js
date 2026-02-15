const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // ✅ app defined here

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/student", require("./routes/student"));


const Teacher = require("./models/teacher");

mongoose.connect("mongodb://127.0.0.1:27017/face-attendance")
    .then(async () => {
        console.log("MongoDB connected");

        const existingTeacher = await Teacher.findOne({ email: "teacher@gmail.com" });
        if (!existingTeacher) {
            await Teacher.create({
                email: "teacher@gmail.com",
                password: "1234"
            });
            console.log("Default teacher created");
        }
    })
    .catch(err => console.error(err));

// Server start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// RegisterStudent.jsx
import axios from "axios";

const token = localStorage.getItem("token");

axios.post("http://localhost:5000/api/student/register",
  { name: "Student1", roll: "01" },
  { headers: { Authorization: token } }
);

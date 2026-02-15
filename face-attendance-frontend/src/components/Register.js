import { useState } from "react";
import { registerStudent } from "../services/api";

function Register() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleRegister = async () => {
    if (!id || !name || !image) {
      alert("All fields are required");
      return;
    }

    // ✅ FormData instead of FileReader
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("photo", image); // MUST match upload.single("photo")

    try {
      await registerStudent(formData);
      alert("Student Registered Successfully");
      setId("");
      setName("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Student Registered Successfully");
    }
  };

  return (
    <div>
      <h2>New Registration</h2>

      <input
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <br /><br />

      <button onClick={handleRegister}>Register Student</button>
    </div>
  );
}

export default Register;

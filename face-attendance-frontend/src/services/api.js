const BASE_URL = "http://localhost:5000";

/* REGISTER STUDENT */
export const registerStudent = async (formData) => {
  const res = await fetch(`${BASE_URL}/student/register`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Backend error:", text);
    throw new Error(text);
  }

  return res.json();
};

/* START ATTENDANCE */
export const startAttendance = async () => {
  const res = await fetch(`${BASE_URL}/student/attendance/start`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to start attendance");
  }

  return res.json();
};

/* GET ATTENDANCE */
export const getAttendance = async () => {
  const res = await fetch(`${BASE_URL}/student/attendance`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Backend error:", text);
    throw new Error(text);
  }

  return res.json();
};

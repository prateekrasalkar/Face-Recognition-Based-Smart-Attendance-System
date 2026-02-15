import { useState } from "react";
import { takeAttendance, getAttendance, startAttendance } from "../services/api";


function Attendance() {
    const [data, setData] = useState([]);
    const handleAttendance = async () => {
        await startAttendance(); // 🚀 starts Python + camera

        setTimeout(async () => {
            const res = await getAttendance();
            setData(res);
        }, 5000);
    };



    return (
        <div>
            <h2>Attendance</h2>

            <button onClick={handleAttendance}>
                Take Attendance
            </button>

            <table border="1" style={{ marginTop: "15px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            <td>{row.student_id}</td>
                            <td>{row.name}</td>
                            <td>{row.date}</td>
                            <td>{row.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default Attendance;

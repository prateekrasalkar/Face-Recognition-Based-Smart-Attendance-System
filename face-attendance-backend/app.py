from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os

from db import students_collection, attendance_collection
from models.face_recognition import register_student, take_attendance

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads/students"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------- REGISTER STUDENT ----------------
@app.route("/register", methods=["POST"])
def register():
    student_id = request.form.get("id")
    name = request.form.get("name")
    image = request.files.get("image")

    if not image:
        return jsonify({"error": "Image required"}), 400

    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    register_student(image_path)

    students_collection.insert_one({
        "student_id": student_id,
        "name": name,
        "image_path": image_path
    })

    return jsonify({"message": "Student registered successfully"})


from threading import Thread

@app.route("/attendance", methods=["POST"])
def attendance():
    def run_camera():
        recognized = take_attendance()

        from datetime import datetime
        now = datetime.now()

        for student in recognized:
            attendance_collection.insert_one({
                "student_id": student["student_id"],
                "name": student["name"],
                "date": now.strftime("%Y-%m-%d"),
                "time": now.strftime("%H:%M:%S")
            })

    Thread(target=run_camera).start()

    return jsonify({"message": "Attendance process started"})



# ---------------- GET ATTENDANCE ----------------
@app.route("/attendance", methods=["GET"])
def get_attendance():
    data = list(attendance_collection.find({}, {"_id": 0}))
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)

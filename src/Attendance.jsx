import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Vcet from "./assets/VCET Logo.jpg";
import { students } from "./Student";
import "./assets/Attendance.css";

function Attendance() {
  const location = useLocation();
  const navigate = useNavigate();
  const { incharge, section } = location.state || {};
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    const disableKeys = (event) => {
      if (
        event.ctrlKey &&
        ["u", "U", "i", "I", "j", "J"].includes(event.key)
      ) {
        event.preventDefault();
      }
      if (event.key === "F12") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);

  const filteredStudents = students[section] || [];

  const handleAttendanceChange = (rollNumber, name, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [rollNumber]: {
        name,
        status,
        reason: status === "Present" ? "" : prev[rollNumber]?.reason || "",
      },
    }));
  };

  const handleReasonChange = (rollNumber, reason) => {
    setAttendanceData((prev) => ({
      ...prev,
      [rollNumber]: { ...prev[rollNumber], reason },
    }));
  };

  const markAllPresent = () => {
    const updatedAttendance = {};
    filteredStudents.forEach((student) => {
      updatedAttendance[student.rollNumber] = {
        name: student.name,
        status: "Present",
        reason: "",
      };
    });
    setAttendanceData(updatedAttendance);
  };

  const handleSubmit = () => {
    const attendanceArray = Object.entries(attendanceData).map(
      ([rollNumber, details]) => ({
        rollNo: rollNumber,
        name: details.name,
        status: details.status,
        reason: details.reason || "",
      })
    );

    localStorage.setItem("attendanceRecords", JSON.stringify(attendanceArray));
    navigate("/Summary", { state: { attendanceData: attendanceArray, incharge, section } });
  };

  return (
    <>
      <img id="attendance-vcet-logo" src={Vcet} alt="VCET Logo" />
      <h1 id="attendance-college-name"><marquee>Velammal College of Engineering and Technology</marquee></h1>
      
      <div id="attendance-container">
        <h2 id="attendance-title">Mark Attendance</h2>

        <p id="attendance-staff">
          <strong>Class In-Charge:</strong> {incharge}
        </p>
        <p id="attendance-section">
          <strong>Section:</strong> {section}
        </p>

        <div id="attendance-controls">
          <button id="attendance-markall" onClick={markAllPresent}>
            Mark All Present
          </button>
          <button id="attendance-submit" onClick={handleSubmit}>
            Submit Attendance
          </button>
        </div>

        <div id="attendance-table-container">
          <table id="attendance-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Present</th>
                <th>Leave</th>
                <th>Absent</th>
                <th>On Duty</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.rollNumber}>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="radio"
                      name={`attendance-${student.rollNumber}`}
                      onChange={() =>
                        handleAttendanceChange(student.rollNumber, student.name, "Present")
                      }
                      checked={attendanceData[student.rollNumber]?.status === "Present"}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={`attendance-${student.rollNumber}`}
                      onChange={() =>
                        handleAttendanceChange(student.rollNumber, student.name, "Leave")
                      }
                      checked={attendanceData[student.rollNumber]?.status === "Leave"}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={`attendance-${student.rollNumber}`}
                      onChange={() =>
                        handleAttendanceChange(student.rollNumber, student.name, "Absent")
                      }
                      checked={attendanceData[student.rollNumber]?.status === "Absent"}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={`attendance-${student.rollNumber}`}
                      onChange={() =>
                        handleAttendanceChange(student.rollNumber, student.name, "On Duty")
                      }
                      checked={attendanceData[student.rollNumber]?.status === "On Duty"}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter Reason (if applicable)"
                      onChange={(e) => handleReasonChange(student.rollNumber, e.target.value)}
                      value={attendanceData[student.rollNumber]?.reason || ""}
                      disabled={attendanceData[student.rollNumber]?.status === "Present"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Attendance;
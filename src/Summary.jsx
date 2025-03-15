import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Vcet from "./assets/VCET Logo.jpg";
import "./assets/Summary.css";
import { jsPDF } from "jspdf";

function Summary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { attendanceData, incharge, section } = location.state || { attendanceData: [] };

  const date = new Date().toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  const totalStudents = attendanceData.length;
  const presentCount = attendanceData.filter(({ status }) => status === "Present").length;

  const leaveStudents = attendanceData.filter(({ status }) => status === "Leave");
  const absentStudents = attendanceData.filter(({ status }) => status === "Absent");
  const ondutyStudents = attendanceData.filter(({ status }) => status === "On Duty");

  useEffect(() => {
    // Disable right-click
    const disableRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    // Disable specific key combinations
    const disableShortcutKeys = (event) => {
      if (
        event.ctrlKey && (event.key === "u" || event.key === "U") || // Disable Ctrl + U
        event.key === "F12" || // Disable F12
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "i")) || // Disable Ctrl + Shift + I
        (event.ctrlKey && event.shiftKey && (event.key === "J" || event.key === "j")) // Disable Ctrl + Shift + J
      ) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", disableShortcutKeys);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableShortcutKeys);
    };
  }, []);

  const handleBack = () => navigate(-1);

  const handleWhatsApp = () => {
    let message = `${date}\n\n`;
    message += `Attendance: ${presentCount} / ${totalStudents}\n\n`;

    if (leaveStudents.length > 0) {
      message += `Informed Leave:\n`;
      leaveStudents.forEach(({ rollNo, name }) => (message += `${rollNo} - ${name}\n`));
      message += `\n`;
    }

    if (absentStudents.length > 0) {
      message += `Not Informed Absent:\n`;
      absentStudents.forEach(({ rollNo, name }) => (message += `${rollNo} - ${name}\n`));
      message += `\n`;
    }

    if (ondutyStudents.length > 0) {
      message += `Informed On Duty:\n`;
      ondutyStudents.forEach(({ rollNo, name }) => (message += `${rollNo} - ${name}\n`));
      message += `\n`;
    }

    // If no absentees, send a message stating that explicitly
    if (leaveStudents.length === 0 && absentStudents.length === 0 && ondutyStudents.length === 0) {
      message += "No absentees for today.\n\n";
    }

    message += `Thank You All`;

    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const handleDownloadPDF = () => {
    if (absentStudents.length === 0 && leaveStudents.length === 0 && ondutyStudents.length === 0) {
      alert("No absentees to download.");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Absentees Summary", 80, 10);

    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${date}`, 10, 20);
    doc.text(`Class In-Charge: ${incharge}`, 10, 30);
    doc.text(`Section: ${section}`, 10, 40);
    doc.text(`Attendance: ${presentCount} / ${totalStudents}`, 10, 50);

    let y = 60;

    if (leaveStudents.length > 0) {
      doc.text("Informed Leave:", 10, y);
      y += 10;
      leaveStudents.forEach(({ rollNo, name }) => {
        doc.text(`${rollNo} - ${name}`, 20, y);
        y += 10;
      });
    }

    if (absentStudents.length > 0) {
      doc.text("Not Informed Absent:", 10, y);
      y += 10;
      absentStudents.forEach(({ rollNo, name }) => {
        doc.text(`${rollNo} - ${name}`, 20, y);
        y += 10;
      });
    }

    if (ondutyStudents.length > 0) {
      doc.text("Informed On Duty:", 10, y);
      y += 10;
      ondutyStudents.forEach(({ rollNo, name }) => {
        doc.text(`${rollNo} - ${name}`, 20, y);
        y += 10;
      });
    }

    doc.text("Thank You All", 10, y + 10);
    doc.save("Absentees_Summary.pdf");
  };

  return (
    <div id="summary-container">
      <img id="summary-vcet-logo" src={Vcet} alt="VCET Logo" />
      <h1 id="summary-college-name"><marquee>Velammal College of Engineering and Technology</marquee></h1>
      <h2 id="summary-title">Absentees Summary</h2>

      <p id="summary-date"><strong>Date:</strong> {date}</p>
      <p id="summary-staff"><strong>Class In-Charge:</strong> {incharge}</p>
      <p id="summary-section"><strong>Section:</strong> {section}</p>
      <p id="summary-attendance"><strong>Attendance:</strong> {presentCount} / {totalStudents}</p>

      <table id="summary-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Roll No</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {leaveStudents.map(({ rollNo, name }) => (
            <tr key={rollNo}>
              <td>Informed Leave</td>
              <td>{rollNo}</td>
              <td>{name}</td>
            </tr>
          ))}
          {absentStudents.map(({ rollNo, name }) => (
            <tr key={rollNo}>
              <td>Not Informed Absent</td>
              <td>{rollNo}</td>
              <td>{name}</td>
            </tr>
          ))}
          {ondutyStudents.map(({ rollNo, name }) => (
            <tr key={rollNo}>
              <td>Informed On Duty</td>
              <td>{rollNo}</td>
              <td>{name}</td>
            </tr>
          ))}
          {leaveStudents.length === 0 && absentStudents.length === 0 && ondutyStudents.length === 0 && (
            <tr>
              <td colSpan="3">No absentees</td>
            </tr>
          )}
        </tbody>
      </table>

      <div id="summary-controls">
        <button id="summary-back" onClick={handleBack}>Go Back</button>
        <button id="summary-whatsapp" onClick={handleWhatsApp}>Send to WhatsApp</button>
        <button id="summary-pdf" onClick={handleDownloadPDF}>Download as PDF</button>
      </div>
    </div>
  );
}

export default Summary;
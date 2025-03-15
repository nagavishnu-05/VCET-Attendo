import { useEffect } from "react";
import Vcet from "./assets/VCET Logo.jpg";
import Grandma from "./assets/Velammal Grandma.png";
import "./assets/Login.css";
import { Link } from "react-router-dom";

function Login() {
  useEffect(() => {
    // Disable right-click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // Disable key combinations for viewing source
    const disableKeys = (event) => {
      if (
        event.ctrlKey &&
        (event.key === "u" || event.key === "U" || event.key === "i" || event.key === "I" || event.key === "j" || event.key === "J")
      ) {
        event.preventDefault();
      }
      if (event.key === "F12") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", (event) => event.preventDefault());
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);

  return (
    <div id="login-main-cont">
      <img id="login-vcet" src={Vcet} alt="Vcet Logo" />
      <h3 id="login-cname">
        <marquee>Velammal College of Engineering and Technology</marquee>
      </h3>
      <h2 id="login-dept">Department of Computer Science and Engineering</h2>

      <h3 id="login-about">About <strong>VCET ATTENDO</strong></h3>
      <pre id="login-about-para">
        The Attendance Tracker System efficiently records and manages student <br></br>
        attendance using MongoDB for secure storage. It allows users to send <br></br>
        attendance updates via WhatsApp and provides an option to download <br></br>
        reports as PDFs for easy access. This system ensures accuracy, <br></br>
        automation, and seamless attendance tracking, reducing manual <br></br>
        effort and errors. With a user-friendly interface and real-time updates, it <br></br>
        enhances efficiency and simplifies attendance management.
      </pre>

      <Link to="/SignIn">
        <button id="login-button">Login</button>
      </Link>

      <img id="login-vcet-grandma" src={Grandma} alt="Vcet Founder" />
    </div>
  );
}

export default Login;

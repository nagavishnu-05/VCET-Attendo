import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Vcet from "./assets/VCET Logo.jpg";
import "./assets/SignIn.css";
import { validateStaffLogin } from "./Student";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  const handleLogin = (e) => {
    e.preventDefault();
    const staff = validateStaffLogin(username, password);

    if (staff) {
      navigate("/Attendance", { state: { incharge: staff.incharge, section: staff.section } });
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div id="signin-container">
      <img id="signin-logo" src={Vcet} alt="VCET Logo" />
      <h3 id="signin-college-name">
        <marquee>Velammal College of Engineering and Technology</marquee>
      </h3>

      <form id="signin-form" onSubmit={handleLogin}>
        <fieldset id="signin-fieldset">
          <legend id="signin-legend">Staff Login</legend>

          <label htmlFor="signin-username">Class & Section</label> <br />
          <input 
            type="text" 
            id="signin-username" 
            placeholder="Enter Your Class & Section :" 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> <br /><br />

          <label htmlFor="signin-password">Password</label> <br />
          <input 
            type="password" 
            id="signin-password" 
            placeholder="Enter Your Password :" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> <br />

          <button id="signin-submit" type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  );
}

export default SignIn;

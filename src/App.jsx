import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login"; 
import SignIn from "./SignIn"; 
import Attendance from "./Attendance";
import Summary from "./Summary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;

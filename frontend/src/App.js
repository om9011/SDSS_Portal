import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/2.0.Landing/Home";
import FillProfile from "./Pages/3.0.Profile/FillProfile";
import MonthlyReport from "./Pages/2.4.MonthlyReport/MonthlyReport";
import PrivateRoute from "./components/Private/PrivateRoute"; // Create a PrivateRoute component for authenticated routes
import StudentBio from "./Pages/2.1.StudentDetails/StudentDetails";
import Classcard from "./components/ClassCard/classcard";
import ListStudent from "./components/Student List/StudentList";
import Attendance from "./Pages/2.3.Attendance/ViewAttendance/Atteendance.js";
import AttendPage from "./Pages/2.3.Attendance/AttendPage";
// import MarkAttendance from './Pages/2.3.Attendance/MarkAttendance/MarkAttendance';
import Event from "./Pages/2.7.BigEvent/Event.js";
import Team from "./Pages/2.9.ManagementTeam/Team.js";
// import CentralizedLoader from './components/Loader/Loader.js';
import OpenRoute from "./components/OpenRoute/OpenRoute.js";
import Register from "./Pages/1.Login&Reegister/Registration/Register.js";
import Login from "./Pages/1.Login&Reegister/Login/Login.js";
import RequestApproval from "./Pages/4.0.admin-request/RequestApproval.js";
import LandingRoute from "./components/OpenRoute/LandingRoute.js";
// import ClassInfoPage from './components/classInfo/ClassInfoPage.js';
import { useSelector } from "react-redux";
import Unauthorized from "./components/OpenRoute/Unauthorized.js";
function App() {

  const role=localStorage.getItem("role")?localStorage.getItem("role"):null
  console.log("ROle at app",role)
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<CentralizedLoader />} /> */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            // <LandingRoute Children={<Login />}>
              <Login />
            // </LandingRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<StudentBio />} />
        <Route path="/class/All" element={
          
                 <Classcard />
         
       } />
        {/* <Route path='/class/:classsName' element={<ClassInfoPage />} /> */}
        <Route path="/u0/updateprofile" element={<FillProfile />} />
        role==="Admin "|| role==="Operator" &&
        {
        <Route path="/mreport" element={<MonthlyReport/>} />
        }
        
        <Route path="/attend" element={<AttendPage role="user" />} />
        <Route path="/attend/view" element={<Attendance role="admin" />} />
        <Route
          path="/attend/mark"
          element={<PrivateRoute role="admin" />}
        />{" "}
        still woriking
        <Route path="/events" element={<Event role="admin" />} />
        <Route path="/auth/team" element={<Team />} />
        <Route path="/request" element={<RequestApproval />} />
      </Routes>
    </Router>
  );
}

export default App;

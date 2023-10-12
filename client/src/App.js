import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
// import Userpage from './components/userpage/Userpage';
import Projectform from "./components/projectform/Projectform";
import Navibar from "./components/navbar/Navibar";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login";
// import ViewTeams from './components/Teams/ViewTeams';
import Userpagess from "./components/Users/Userpagess";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OTP from "./components/otp/OTP";
import Users from "./components/Users/Users";
import Voting from "./components/Votingpage/Voting";
import ViewProjects from "./components/projects/Viewprojects";
function App() {
  const [isAdminSigned, setIsAdminSigned] = useState(null);

  const adminsignin = () => {
    setIsAdminSigned(true);
  };

  const adminsignout = () => {
    setIsAdminSigned(false);
  };
  const [isUserSigned, setIsUserSigned] = useState(null);

  const usersignin = () => {
    setIsAdminSigned(true);
  };

  const usersignout = () => {
    setIsAdminSigned(false);
  };

  return (
    <div className="App">
      {/* <OTP /> */}

      <Navibar />
      <ViewProjects/>
      {/* <Voting/>  */}
      {/* <Users /> */}
      {/* <Login/> */}
      {/* <ViewTeams/> */}
      {/* <Userpagess/> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/userpages" element={<Userpagess />}></Route>
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;

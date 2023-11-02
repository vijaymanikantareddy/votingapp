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
import ViewProjects from "./components/votespage/Viewprojects";
import Home from "./components/home/Home";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/voting" element={<Voting />}></Route>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route path="/viewprojects" element={<ViewProjects />}></Route>
          <Route path="/addproject" element={<Projectform />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

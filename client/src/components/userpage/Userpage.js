import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup";
import "./userstyle.css";

function Userpage() {
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [email, setEmail] = useState("");
  const [teamnumber, setTeamnumber] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [rollnumber, setRollnumber] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  //   const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleTeamnumberChange = (e) => {
    setTeamnumber(e.target.value);
  };

  const handleRollnumberChange = (e) => {
    setRollnumber(e.target.value);
  };

  const handleCollegeChange = (e) => {
    setCollege(e.target.value);
  };

  const submitdata = () => {
    // navigate("/");
  };

  const validateEmail = () => {
    // Make an API request to check if the email exists

    axios
      .post("http://localhost:5000/checkEmail", { email })
      .then((result) => {
        // If the email exists, set emailExists to true and display the warning text
        if (result.data == "exists") {
          setEmailExists(true);
        } else {
          // If the email doesn't exist, set emailExists to false and proceed to send OTP
          setEmailExists(false);
          // Here, you can send the OTP or perform other actions
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = (e) => {
    setShowpassword(!showpassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmpassword(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != confirmpassword) {
      alert("passwords does not match");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send the OTP via email
    axios
      .post("http://localhost:5000/sendOTP", {
        email,
        otp,
      })
      .then((result) => {
        console.log(result);
        alert("OTP sent successfully");

        // Now, you can proceed with the OTP validation and user registration
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mainbody">
      <section className="container">
        <header>Vote the Project</header>
        <hr />
        <form className="form">
          <div className="column">
            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={teamnumber}
                onChange={handleTeamnumberChange}
                required
              />
            </div>
            <div className="input-box">
              <label>Roll Number</label>
              <input
                type="text"
                placeholder="Enter Roll Number"
                value={rollnumber}
                onChange={handleRollnumberChange}
                required
              />
            </div>
          </div>

          <div className="column">
            <div className="input-box">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="input-box">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
            </div>
          </div>
          <div className="column">
            {emailExists ? (
              <p className="warningtext">Mail Already Exists</p>
            ) : (
              <p className="warningtext hidden">Mail Already Exists</p>
            )}
          </div>
          {/* <div className="column">
            <div className="input-box">
              <label>College</label>
              <div className="select-box">
                <select value={college} onChange={handleCollegeChange} required>
                  <option hidden>Select</option>
                  <option>ACET</option>
                  <option>ACOE</option>
                  <option>AEC</option>
                </select>
              </div>
            </div>

            <div className="input-box">
              <label>Branch</label>
              <div className="select-box">
                <select value={branch} onChange={handleBranchChange} required>
                  <option hidden>Select</option>
                  <option>IT</option>
                  <option>CSE</option>
                  <option>EEE</option>
                  <option>ECE</option>
                  <option>MECH</option>
                  <option>Civil</option>
                </select>
              </div>
            </div>
          </div> */}
          <div className="column">
            <button className="verifybutton">
              <span>Send OTP</span>
            </button>

            <div className="input-box">
              <label>OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </div>
            <button className="verifybutton">Verify</button>
          </div>

          {/* <div className="column">
            <div className="input-box">
              <label>Password</label>
              <input
                type={showpassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button className="verifybutton" onClick={togglePasswordVisibility}>
              <span> {showpassword ? "Hide" : "Show"}</span>
            </button>

            <div className="input-box">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div> */}

          <div className="gender-box">
            <h3>Gender</h3>
            <div className="gender-option">
              <div className="gender">
                <input
                  type="radio"
                  id="check-male"
                  name="gender"
                  value="male"
                  onChange={handleGenderChange}
                  required
                />
                <label for="check-male">Male</label>
              </div>
              <div className="gender">
                <input
                  type="radio"
                  id="check-female"
                  value="female"
                  name="gender"
                  onChange={handleGenderChange}
                />
                <label for="check-female">Female</label>
              </div>
            </div>
          </div>

          <button className="submitbutton" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default Userpage;

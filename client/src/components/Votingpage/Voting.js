import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./voting.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup";
// import "./userstyle.css";

function Voting() {
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
  const [message, setMessage] = useState("");

  //   const navigate = useNavigate();
  const [messageType, setMessageType] = useState("error");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    // Fetch the teamtitle and teamnumber from the backend
    axios
      .get("http://localhost:5000/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });
  }, []);

  // Handle team selection
  const handleTeamSelection = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRollnumberChange = (e) => {
    setRollnumber(e.target.value);
  };

  const handleCollegeChange = (e) => {
    setCollege(e.target.value);
  };

  const sendOTP = async () => {
    // e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/sendotp", {
        email,
      });

      setMessage("OTP Sent");
      setMessageType("success"); // Set message type to success
      setError(false);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/verifyotp", {
        email,
        otp,
      });
      setMessage("OTP Verified");
      setMessageType("success"); // Set message type to success
      setError(false);
    } catch (error) {
      setMessage("Wrong OTP Check again");
      setError(true);
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !rollnumber || !email || !phone || !otp || !selectedTeam) {
      setMessage("Please fill in all fields");
      setError(true);
      return;
    }
    try {
      // Send the email and selectedTeamNumber to the server
      const response = await axios.post("http://localhost:5000/votesubmit", {
        name,
        rollnumber,
        email,
        phone,
        selectedTeam,
      });

      setMessage("You have successfully voted");
      setMessageType("success"); // Set message type to success
      setError(false);
      setTimeout(() => {
        window.location.reload();
      }, 60000);
    } catch (error) {
      setMessage("Error Submitting Form, Try again later");
      setMessageType("error"); // Set message type to error
      setError(true);
      console.error("Error submitting form:", error);
    }
  };

  const validateEmail = (e) => {
    e.preventDefault();

    // Make an API request to check if the email exists
    const validDomains = ["aec.edu.in", "acet.ac.in", "acoe.edu.in"];
    const enteredDomain = email.split("@")[1];

    if (!validDomains.includes(enteredDomain)) {
      // Display an error message or take other actions for invalid domains
      setMessage("Enter college mail only");
      setError(true);
      // alert("Enter college mail only");
      return;
    } else {
      setError(false);
    }
    axios
      .post("http://localhost:5000/checkEmail", { email })
      .then((result) => {
        // If the email exists, set emailExists to true and display the warning text
        if (result.data == "exists") {
          setEmailExists(true);
          setMessage("You have already Voted");
          setError(true);
          // alert("You have already Voted");
        } else {
          // If the email doesn't exist, set emailExists to false and proceed to send OTP
          setEmailExists(false);
          sendOTP();
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
                value={name}
                onChange={handleNameChange}
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

          <div className="column">
            <button className="verifybutton" onClick={validateEmail}>
              <span>Send OTP</span>
            </button>

            <div className="input-box">
              <label>OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>
            <button className="verifybutton" onClick={verifyOTP}>
              Verify
            </button>
          </div>
          <div>
            <p
              className={`message ${
                messageType === "success" ? "success" : "error"
              }`}
            >
              {message}
            </p>
          </div>

          
          <div className="vote-box">
            {/* <center> */}
              <h4>Vote The Project</h4>
              {teams.map((team) => (
                <div key={team._id} className="team-container">
                  <input
                    type="radio"
                    name="team"
                    id={team._id}
                    value={team._id}
                    checked={selectedTeam === team._id}
                    onChange={handleTeamSelection}
                  />
                  <label htmlFor={team._id} className="team-label">
                    <br />
                    <i>Team Number: </i>
                    <b>{team.teamnumber}</b> <i>Team Title:</i>{" "}
                    <b>{team.teamtitle}</b>
                  </label>
                </div>
              ))}
            {/* </center> */}
            <div>
              <b>
                Selected Team:{" "}
                {selectedTeam &&
                  teams.find((team) => team._id === selectedTeam).teamtitle}
              </b>
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

export default Voting;

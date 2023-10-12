import React, { useState } from "react";
import axios from "axios";

function OTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const sendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:4000/sendotp", {
        email,
      });
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:4000/verify", {
        email,
        otp,
      });
      alert("Correct OTP");
      setMessage(response.data);
    } catch (error) {
      alert("Wrong OTP Check again");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>OTP Verification</h1>
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOTP}>Send OTP</button>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOTP}>Verify OTP</button>
      <div>{message}</div>
    </div>
  );
}

export default OTP;

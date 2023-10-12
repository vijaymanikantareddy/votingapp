import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter as Router } from 'react-router-dom';
import "./loginstyle.css";
// import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [email, setEmail] = useState("");
  // const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const togglePasswordVisibility = (e) => {
    setShowpassword(!showpassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "successuser") {
          // navigate("/user_complaint_form");
        } else if (result.data === "successadmin") {
          // navigate("/Complaintform_admin");
        } else if (result.data === "Incorrect Password") {
          alert("Incorrect Password");
        } else {
          alert("Account Does not exist");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
      <div className="w-96 p-6 bg-gray-100 shadow-2xl rounded-md">
        <h1 className="text-3xl block text-center font-semibold">Login</h1>
        <hr className="mt-3" />
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="mail" className="block text-base mb-2 font-bold">
              Email
            </label>

            <div className="input-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="password"
              className="block text-base mb-2 font-bold"
            >
              Password
            </label>
            <div className="input-group">
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Enter New Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="btn btn-outline-primary indigo"
                onClick={togglePasswordVisibility}
              >
                <i> {showpassword ? "Hide" : "Show"}</i>
              </button>
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div className="">{/* Links go here */}</div>
            <div className="">{/* Links go here */}</div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="border-2 border-indigo-800 bg-indigo-700 text-white py-1 w-full rounded-md hover:text-black font-semibold hover:bg-indigo-900 "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

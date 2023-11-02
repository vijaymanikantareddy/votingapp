import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="mainhome">
        <h1 className="homehead">Vote the Project</h1>
        <Link to="/login" className="homelogin">
          <button>Login</button>
        </Link>
        <Link to="/voting" className="homelogin">
          <button>Vote</button>
        </Link>
      </div>
    </>
  );
}

export default Home;

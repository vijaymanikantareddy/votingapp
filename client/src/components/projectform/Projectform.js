import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./Projectform.css";
import { Link } from "react-router-dom";

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
function Projectform() {
  const [teamnumber, setTeamnumber] = useState("");
  const [teamtitle, setTeamtitle] = useState("");
  const [email, setEmail] = useState("");
  const [projectdomain, setProjectdomain] = useState("");
  const [teamleadername, setTeamleadername] = useState("");
  const [teammembers, setTeammembers] = useState("");
  const [description, setDescription] = useState("");
  const [teamcount, setTeamcount] = useState();

  const [emailExists, setEmailExists] = useState(false);

  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  const names = [];
  const emails = [];

  useEffect(() => {
    // Fetch the next available team number from the backend using Axios
    axios.get('http://localhost:5000/next-team-number')
      .then((response) => {
        const nextNumber = response.data.nextTeamNumber;
        setTeamnumber(nextNumber);
      })
      .catch((error) => {
        console.error('Error fetching next team number:', error);
      });
  }, []);


  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/getTeamNumber") // Replace with your backend endpoint
  //     .then((response) => {
  //       setTeamnumber(response.data.teamNumber);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching team number:", error);
  //     });
  // }, []);

  const handleTeamleadernameChange = (e) => {
    setTeamleadername(e.target.value);
  };

  const handleTeamtitleChange = (e) => {
    setTeamtitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const handleTeamnumberChange = (e) => {
  //   setTeamnumber(e.target.value);
  // };

  const handleProjectdomainChange = (e) => {
    setProjectdomain(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    names.push(teamleadername);
    emails.push(email);
    teammemberData.forEach((teamMember) => {
      const name = teamMember.name;
      const email = teamMember.email;

      names.push(name);
      emails.push(email);
    });
    // console.log(names.length, names, emails, projectdomain, description, teamtitle);
    if (
      !teamnumber ||
      !teamtitle ||
      !email ||
      !projectdomain ||
      !teamleadername ||
      !description
    ) {
      setError("Please fill in all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/createproject", {
        teammembers,
        names,
        emails,
        projectdomain,
        description,
        teamtitle,
      })
      .then((result) => {
        console.log(result);
        window.alert("Success");
        // navigate('/');
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred. Please try again later.");
      });
  };

  const [teammemberData, setTeammemberData] = useState([]); // Array to store team member data

  const handleTeammembersChange = (e) => {
    setTeammembers(Number(e.target.value));
    setTeammemberData([]); // Clear the existing data when the number of team members changes
  };

  const handleTeammembernameChange = (e, index) => {
    const newData = [...teammemberData];
    newData[index] = { ...newData[index], name: e.target.value };
    setTeammemberData(newData);
  };

  const handleMemberemailChange = (e, index) => {
    const newData = [...teammemberData];
    newData[index] = { ...newData[index], email: e.target.value };
    setTeammemberData(newData);
  };

  const generateTeamMemberInputs = () => {
    const inputs = [];
    for (let i = 0; i < teammembers; i++) {
      inputs.push(
        <div className="column" key={i}>
          <div className="input-box">
            <label>{`Team member ${i + 1}`}</label>
            <input
              type="text"
              placeholder={`Enter Team Member ${i + 1} Name`}
              value={teammemberData[i]?.name || ""}
              onChange={(e) => handleTeammembernameChange(e, i)}
              required
            />
          </div>
          <div className="input-box">
            <label>{`Team Member ${i + 1} Email`}</label>
            <input
              type="email"
              placeholder={`Enter Team Member ${i + 1} Email`}
              value={teammemberData[i]?.email || ""}
              onChange={(e) => handleMemberemailChange(e, i)}
              required
            />
          </div>
        </div>
      );
    }
    // teammemberData.forEach((teamMember, index) => {
    //   const name = teamMember.name; // Access the name for the current team member
    //   const email = teamMember.email; // Access the email for the current team member

    //   // You can use the 'name' and 'email' values as needed here
    //   console.log(`Team Member ${index + 1} Name: ${name}`);
    //   console.log(`Team Member ${index + 1} Email: ${email}`);
    // });
    return inputs;
  };

  return (
    <div className="mainbody">
      <section className="container">
        <header>Add a Project</header>
        <hr />
        <form className="form">
          <div className="column">
            <div className="input-box">
              <label>Team Number</label>
              <input
                type="text"
                placeholder="Enter Team Number"
                value={teamnumber}
                readOnly
                required
              />
            </div>
            <div className="input-box">
              <label>Team Title</label>
              <input
                type="text"
                placeholder="Enter Team Title"
                value={teamtitle}
                onChange={handleTeamtitleChange}
              />
            </div>
          </div>

          <div className="column">
            <div className="input-box">
              <label>Project Domain</label>
              <input
                type="text"
                placeholder="Enter Project Domain"
                value={projectdomain}
                onChange={handleProjectdomainChange}
              />
            </div>
            <div className="input-box">
              <label>Team Members (Excluding TL)</label>
              <div className="select-box">
                <select value={teammembers} onChange={handleTeammembersChange}>
                  <option hidden>Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="input-box">
              <label>Team Leader Name</label>
              <input
                type="text"
                placeholder="Enter Team Leader Name"
                value={teamleadername}
                onChange={handleTeamleadernameChange}
              />
            </div>
            <div className="input-box">
              <label>Team Leader Email</label>
              <input
                type="email"
                placeholder="Enter Team Leader Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          {generateTeamMemberInputs()}

          <div className="input-box textarea">
            <label>Description</label>
            <textarea
              placeholder="Enter project description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          {error && <div className="text-danger">{error}</div>}
          <button className="submitbutton" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default Projectform;

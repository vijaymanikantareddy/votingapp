import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Viewprojects.css";

function ViewProjects() {
  // const [records, setRecords] = useState([]);
  // const [columns, setColumns] = useState([]);

  // const [search, setSearch] = useState("");
  // const [searchval, setSearchval] = useState("");
  return (
    <>
      <div className="viewprojectbody">
        <div className="viewprojectcontainer">
          <h1 className="viewprojectheading">All Complaints</h1>
          <hr />
          <form className="container">
            <div className="row">
              <div class="form-group col-md-3 mt-3 mb-3">
                <select id="inputState" class="form-control">
                  <option selected>Search By</option>
                  <option value="college">College</option>
                  <option value="email">Email</option>
                  <option value="building">Building</option>
                  <option value="date">Date</option>
                  <option value="type">Type</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <div class="form-group col-md-9 mt-3 mb-3">
                <input
                  type="searching"
                  class="form-control"
                  id="searching"
                  placeholder="Enter Complaint"
                />
              </div>
            </div>
          </form>

          <table className="table table-bordered mt-3">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th>Email</th>
                <th>College</th>
                <th>Building</th>
                <th>Location</th>
                <th>Date</th>
                <th>Floor</th>
                <th>Type</th>
                <th>Description</th>
                <th>Remark</th>
                <th>Status</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {/* {records
              .filter((item) => {
                const searchLowerCase = search.toLowerCase();
                const itemTypeLowerCase = (item[searchval] || "").toLowerCase();
                return (
                  searchLowerCase === "" ||
                  itemTypeLowerCase.includes(searchLowerCase)
                );
              })
              .map((d, i) => (
                <tr key={i._id}>
                  <td>{d.email}</td>
                  <td>{d.college}</td>
                  <td>{d.building}</td>
                  <td>{d.location}</td>
                  <td>{d.date}</td>
                  <td>{d.floor}</td>
                  <td>{d.type}</td>
                  <td>{d.comdes}</td>
                  <td>{d.remark}</td>
                  <td>{d.status}</td>
                  <td>
                    <Link
                      to={`/updatecompli/${i._id}`}
                      className="btn btn-sm btn-success mb-1"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-danger ml-1 mb-1"
                      
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewProjects;

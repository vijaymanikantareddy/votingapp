import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Viewprojects.css";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import Navibar from "../navbar/Navibar";

function ViewProjects() {
  const handlePrintList = (teamtitle, voters) => {
    const doc = new jsPDF();
    doc.text(`Voters List for Team: ${teamtitle}`, 10, 10);

    voters.forEach((email, index) => {
      doc.text(email, 10, 20 + index * 10);
    });

    doc.save(`${teamtitle} voters_list.pdf`);
  };
  const [data, setData] = useState([]);
  const columns = [
    { name: "Team Number", selector: "teamnumber", sortable: true },
    { name: "Team Name", selector: "teamtitle", sortable: true },
    { name: "Team Leader", selector: "teamleader", sortable: true },
    {
      name: "Votes Count",
      selector: "voters.length",
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="voter-count">{row.voters.length}</span>
          <button
            onClick={() => handlePrintList(row.teamtitle, row.voters)}
            className="print-button"
          >
            Print
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/getprojectsdata")
      .then((response) => {
        setData(response.data);
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [records, setRecords] = useState(data);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log("Search term:", searchTerm); // Debug output
    if (searchTerm === "") {
      setRecords(data); // Reset to the original data
    } else {
      const filteredData = data.filter((row) =>
        row.teamtitle.toLowerCase().includes(searchTerm)
      );
      setRecords(filteredData);
    }
  };
  return (
    <>
    <Navibar/>
      <div className="prodisplay bg-indigo-600">
        <div className="container mt-5 ">
          <div className="text-end">
            <input
              type="text"
              className="searchinput"
              placeholder="Search by Team Name"
              onChange={handleFilter}
            />
          </div>
          <DataTable
            columns={columns}
            data={records}
            fixedHeader
            pagination
            customStyles={{
              header: {
                style: {
                  fontSize: "20px", // Adjust the font size as needed
                },
              },
              rows: {
                style: {
                  fontSize: "16px", // Adjust the font size as needed
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ViewProjects;

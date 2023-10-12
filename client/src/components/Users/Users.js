import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // axios
    //   .get("http://localhost:5000/")
    //   .then((result) => setUsers(result.data))
    //   .catch((err) => console.log(err));
  }, []
  );
  const handleDelete = (id) => {
    // axios
    //   .delete("http://localhost:5000/deleteUser/" + id)
    //   .then((res) => {
    //     console.log(res);
    //     window.location.reload();
    //   })
    //   .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="d-flex vh-100 bg-indigo-600 justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3 ">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-success"
                      >
                        Update
                      </Link>
                      <Link
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(user._id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;

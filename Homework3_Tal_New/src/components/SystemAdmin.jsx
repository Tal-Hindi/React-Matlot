import React from "react";
import { useState } from "react";
import EditDetails from "./EditDetails";
export default function SystemAdmin({
  users,
  updateUser,
  deleteUser,
  onPictureSelect,
  onEdit,
}) {
  const [updateClicked, setupdateClicked] = useState(false);
  const [userToUpdate, setuserToUpdate] = useState(null);

  const onUpdatedClicked = (user) => {
    // console.log(user);
    setuserToUpdate(user);
    setupdateClicked(true);
  };
  const handleUpdateUser = (user) => {
    setupdateClicked(false);
    updateUser(user);
  };

  const handleDeleteUser = (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(email);
      setupdateClicked(false);
    }
  };

  return (
    <>
      <div className="admin-panel">
        <h2>Administrator Panel</h2>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Username</th>
                <th>Password</th>
                <th>City</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Street</th>
                <th>HouseNumber</th>
                <th>BirthDate</th>
                <th>Picture</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.city}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.street}</td>
                  <td>{user.housenumber}</td>
                  <td>{user.birthdate}</td>
                  <td>
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt="Preview"
                        className="preview-image"
                      />
                    )}
                  </td>

                  <td>
                    <button
                      className="admin-btn"
                      onClick={() => onUpdatedClicked(user)}
                    >
                      Update
                    </button>
                    <button
                      className="admin-btn"
                      onClick={() => handleDeleteUser(user.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {updateClicked && (
        <EditDetails
          userDetails={userToUpdate}
          handleEditChange={handleUpdateUser}
          onPictureSelect={onPictureSelect}
        />
      )}
    </>
  );
}

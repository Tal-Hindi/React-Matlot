import React from "react";

export default function SystemAdmin({ users }) {
  return (
    <div className="admin-panel">
      <h2>Administrator Panel</h2>
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
                <button className="admin-btn" onClick={() => updateUser(user)}>
                  Update
                </button>
                <button className="admin-btn" onClick={() => deleteUser(user)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

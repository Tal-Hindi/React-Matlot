// import { useState } from "react";

const Profile = ({ foundUser, logoutUser, onEdit }) => {
  const handleLogout = () => {
    const email = foundUser?.email;
    logoutUser(email);
  };

  return (
    <div className="profile-container">
      <div className="profile-heading">
        <h2>User Profile</h2>
      </div>
      <div>
        {foundUser && (
          <div className="profile-details">
            <p>Username: {foundUser.username}</p>
            <p>Email: {foundUser.email}</p>
            <p>Birthdate: {foundUser.birthdate}</p>
            <p>First Name: {foundUser.firstname}</p>
            <p>Last Name: {foundUser.lastname}</p>
            <p>City: {foundUser.city}</p>
            <p>Street: {foundUser.street}</p>
            <p>House Number: {foundUser.housenumber}</p>
            <img src={foundUser.picture} alt="User" />
          </div>
        )}
        <div className="profile-actions">
          <button className="button-profile" onClick={handleLogout}>
            Logout
          </button>
          <button className="button-profile" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import { useState } from "react";

const Profile = ({ foundUser, logoutUser, onEdit }) => {
  const handleLogout = () => {
    const email = foundUser.email;
    logoutUser(email);
  };

  return (
    <div className="profile-container">
      <div className="profile-heading">
        <h2>User Profile</h2>
      </div>
      <div className="profile-details">
        {foundUser && (
          <div className="profile-details-grid">
            <div className="profile-item">
              <span className="profile-label">Username: </span>
              <span className="profile-value">{foundUser.username}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Password:</span>
              <span className="profile-value">{foundUser.password}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{foundUser.email}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Birthdate:</span>
              <span className="profile-value">{foundUser.birthdate}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">First Name:</span>
              <span className="profile-value">{foundUser.firstname}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Last Name:</span>
              <span className="profile-value">{foundUser.lastname}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">City:</span>
              <span className="profile-value">{foundUser.city}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Street:</span>
              <span className="profile-value">{foundUser.street}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">House Number:</span>
              <span className="profile-value">{foundUser.housenumber}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Picture:</span>
              <img
                src={foundUser.picture}
                alt="Preview"
                className="preview-image"
              />
            </div>
          </div>
        )}
      </div>
      <div className="profile-actions">
        <button className="button-profile" onClick={handleLogout}>
          Logout
        </button>
        <button className="button-profile" onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;

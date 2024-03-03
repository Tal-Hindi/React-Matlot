import React, { useState, useEffect } from "react";
import EditDetails from "./EditDetails";

const Profile = ({ user, onLogout }) => {
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const logoutUser = (email) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.email === email) {
      sessionStorage.removeItem("loggedInUser");
      onLogout();
      console.log("User logged out successfully.");
      return true;
    } else {
      console.log(
        "Failed to logout. User not logged in or email does not match."
      );
      return false;
    }
  };

  const handleLogout = () => {
    const email = currentUser?.email;
    const logoutSuccess = logoutUser(email);
    if (logoutSuccess) {
      setCurrentUser(null);
    }
  };

  const handleEditDetailsClick = () => {
    setShowEditDetails((prevState) => !prevState);
  };

  const onUpdateSuccess = (updatedUser) => {
    setCurrentUser(updatedUser);
    setShowEditDetails(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-heading">
        <h2>User Profile</h2>
      </div>
      <div>
        {currentUser && (
          <div className="profile-details">
            <p>Username: {currentUser.username}</p>
            <p>Email: {currentUser.email}</p>
            <p>Birthdate: {currentUser.birthdate}</p>
            <p>First Name: {currentUser.firstname}</p>
            <p>Last Name: {currentUser.lastname}</p>
            <p>City: {currentUser.city}</p>
            <p>Street: {currentUser.street}</p>
            <p>House Number: {currentUser.housenumber}</p>
            <img src={currentUser.picture} alt="User" />
          </div>
        )}
        <div className="profile-actions">
          <button className="button-profile" onClick={handleLogout}>
            Logout
          </button>
          <button className="button-profile" onClick={handleEditDetailsClick}>
            {showEditDetails ? "Hide Details" : "Edit Details"}
          </button>
        </div>
      </div>
      {showEditDetails && (
        <EditDetails user={currentUser} onUpdateSuccess={onUpdateSuccess} />
      )}
    </div>
  );
};

export default Profile;

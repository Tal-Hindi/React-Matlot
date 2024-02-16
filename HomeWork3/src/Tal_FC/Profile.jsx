import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { loadRegisteredUsers } from './UserSessionStorage';

const Profile = ({ user, onLogout, onEditDetails }) => {
  const registeredUsers = loadRegisteredUsers();

  const handleLogout = () => {
    // Logic to handle user logout
    onLogout();
  };

  const handleEditDetails = () => {
    // Logic to handle edit details
    onEditDetails();
  };

  return (
    <div>
      {user ? (
        <div>
          <Typography variant="h5">Profile Details</Typography>
          <Typography>
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
          {/* Add other user details as needed */}
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="outlined" onClick={handleEditDetails}>
            Edit Details
          </Button>
          <Typography>
            <a href="your_favorite_game_link" target="_blank" rel="noopener noreferrer">
              Favorite Online Game
            </a>
          </Typography>
        </div>
      ) : (
        <Typography>You must connect to the system.</Typography>
      )}
    </div>
  );
};

export default Profile;


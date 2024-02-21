import "./App.css";
import Register from "./Tal_FC/Register";
import Login from "./Tal_FC/Login";
import Profile from "./Tal_FC/Profile";
import { createTheme } from '@mui/material/styles';
//---------------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import Swal from 'sweetalert2';
import EditUser from "./Tal_FC/EditDetails";
import SystemAdmin from "./Tal_FC/SystemAdmin";

const defaultTheme = createTheme();


const App = () => {
  const [appUsers, setAppUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);

  const loadUsers = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    return existingUsers;
  }

  useEffect(() => {
    const loadedUsers = loadUsers();
    setAppUsers(loadedUsers);
  }, []);

  const registerUser = (newUser) => {
    const updatedUsers = [...appUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setAppUsers(updatedUsers);
  };

  const loginUser = (username, password) => {

    if (username == "admin" && password == "d12343211a") {
      setIsLoggedIn(true);
      setIsAdmin(true);
    }
    else {

      const foundUser = appUsers.find(user => user.username === username && user.password === password);

      if (foundUser) {
        setIsLoggedIn(true);
        setFoundUser(foundUser);
        const newregisteredUser = { ...foundUser };
        const updatedUsers = [...loadRegisteredUsers(), newregisteredUser];
        sessionStorage.setItem('registerdUsers', JSON.stringify(updatedUsers));
      } else {
        Swal.fire({
          title: 'User not found',
          text: 'You must sign up first',
          icon: 'error'
        });
      }
    }

  }

  const logoutUser = (email) => {
    setIsLoggedIn(false);
    setFoundUser(null);

    const arrayFromStorage = loadRegisteredUsers();
    const indexToDelete = arrayFromStorage.findIndex(obj => obj.email === email);
    arrayFromStorage.splice(indexToDelete, 1);
    sessionStorage.setItem('registerdUsers', JSON.stringify(arrayFromStorage));
  };

  const handleEdit = () => {
    setIsEdit(true);
  }

  const handleEditCancel = () => {
    setIsEdit(false);
  }

  const editUser = (editedUser) => {
    setIsEdit(false);

    setAppUsers((prev) => {
      let updated = prev.map((u) => {
        if (u.email == editedUser.email) return editedUser;
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    });


    // Update user details in local storage or wherever they are stored
    // ...

    // Optionally, show a success message
    Swal.fire({
      title: `Hey ${editedUser.username}`,
      text: 'Profile updated successfully',
      icon: 'success'
    });
  }

  const loadRegisteredUsers = () => {
    return JSON.parse(sessionStorage.getItem('registerdUsers')) || [];
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Register registerUser={registerUser} />
          {isLoggedIn ? (
            <>
              {isAdmin ? (<SystemAdmin appUsers={appUsers}/>) :

                (<Profile foundUser={foundUser} logoutUser={logoutUser} onEdit={handleEdit} />)

              }
              {isEdit ? (
                <EditUser userDetails={foundUser} onCancel={handleEditCancel} onSave={editUser} />
              ) : null}
            </>
          ) : (
            <Login appUsers={appUsers} onLogin={loginUser} />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
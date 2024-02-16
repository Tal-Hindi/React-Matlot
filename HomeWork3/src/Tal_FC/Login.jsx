import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react'
import { loadUsers } from "./UserLocalStorage";
import Swal from 'sweetalert2'
import { loadRegisteredUsers } from "./UserSessionStorage"

const defaultTheme = createTheme();

export default function Login() {

  const [userLoginDetails, setUserLoginDetails] = useState({
    usernamelogin: "",
    passwordlogin: ""
  })

  const [userIdCounter, setUserIdCounter] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [formErrors, setFormErrors] = useState({})

  const generateUniqueId = () => { //increase id counter every time a new user is created
    const newId = userIdCounter;
    setUserIdCounter(prevCounter => prevCounter + 1);
    return newId;
  }

  function handleChange(event) {

    const { value, id } = event.target;  //Destructre

    //takes the prev value of the entire state and changes the current e element 
    setUserLoginDetails(prevValue => ({
      ...prevValue,
      [id]: value,

    }));

  }

  const loginUser = (username, password) => {

    //all the users from loacl stoarge
    const users = loadUsers()

    // check if this user is exists in the users array
    const foundUser = users.find(user => user.username === username && user.password === password);
    
    //if found ..
    if (foundUser) {
      setIsLoggedIn(true);
      setFoundUser(foundUser) // Set the found user details in the state
      //create new registered user and save all his data 
      const newregisteredUser = {
        id: generateUniqueId(),
        ...foundUser
      }
      const updatedUsers = [...loadRegisteredUsers(), newregisteredUser];
      // Update session storage with the updated list of users
      sessionStorage.setItem('registerdUsers', JSON.stringify(updatedUsers));
    }

  }

  const handleSubmit = (event) => {

    event.preventDefault();

    const errors = validate(userLoginDetails);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {

      const data = new FormData(event.currentTarget);

      loginUser(data.get("usernamelogin"), data.get("passwordlogin"))

      if(foundUser){
      Swal.fire({
        title: `Welcome Back ${foundUser.firstname}`,
        text: "You are logged in!",
        icon: "success"
      });}

      //clearing the form fields
      setUserLoginDetails({
        usernamelogin: "",
        passwordlogin: ""
      })
    }
  };

  const validate = (values) => {
    const errors = {};

    const requiredFields = ['usernamelogin', 'passwordlogin'];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = 'This is a required field!';
      }
    });

    if (values.usernamelogin && !values.usernamelogin.match(/^[a-zA-Z0-9!@#$%^&*()-_+=|\\?<>{}[\]:;'".,~`]+$/)) {
      errors.usernamelogin = 'Invalid username';
    }
    if (values.usernamelogin && values.usernamelogin.length > 60) {
      errors.usernamelogin = 'Username must be less than 60 nchar';
    }
    if (values.passwordlogin && !values.passwordlogin.match(/^(?=.*\d)(?=.*[a-z]*)(?=.*[A-Z]*)(?=.*[!@#$%^&*()-_=+[\]{};:'",.<>?]).{7,12}$/)) {
      errors.passwordlogin = 'Invalid password';
    }
    return errors;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="usernamelogin"
              name="usernamelogin"
              label="User name"
              onChange={handleChange}
              autoComplete="username"
              value={userLoginDetails.usernamelogin}
              error={Boolean(formErrors.usernamelogin)}
              helperText={formErrors.usernamelogin}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="passwordlogin"
              name="passwordlogin"
              autoComplete="current-password"
              onChange={handleChange}
              value={userLoginDetails.passwordlogin}
              error={Boolean(formErrors.passwordlogin)}
              helperText={formErrors.passwordlogin}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

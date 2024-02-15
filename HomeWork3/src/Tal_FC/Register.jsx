import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import * as data from "../israel_cities_names_and__geometric_data.json";
import React, { useState } from 'react'

const city_options = data.default; // Access the default export from the imported module

const defaultTheme = createTheme();

export default function Register() {

//hey
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    passwordAuthentication: "",
    picture: "",
    firstname: "",
    lastname: "",
    email: "",
    birthday: "",
    city: "",
    street: "",
    houseNumber: ""
})


const [userIdCounter, setUserIdCounter] = useState(1);

function generateUniqueId() {
    const newId = userIdCounter;
    setUserIdCounter(prevCounter => prevCounter + 1);
    return newId;
}

function handleChange(event) {

    const { value, id } = event.target;  //Destructre

    //takes the prev value of the entire state and changes the current e element 
    setUserDetails(prevValue => ({
        ...prevValue,
        [id]: value

    }));

}


function registerUser(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Create a new user object
    const newUser = {
        id: generateUniqueId(),
        ...userDetails
    };

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the list
    const updatedUsers = [...existingUsers, newUser];

    // Update localStorage with the updated list of users
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Reset the form after successful registration
    setUserDetails({
        username: "",
        password: "",
        passwordAuthentication: "",
        picture: "",
        firstname: "",
        lastname: "",
        email: "",
        birthday: "",
        city: "",
        street: "",
        houseNumber: ""
    });
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
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={registerUser}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="passwordAuthentication"
                  name="passwordAuthentication"
                  label="Password Authentication"
                  type="password"
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="birthday"
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="birthday"
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="city"
                  onBlur={handleChange}
                  options={city_options || []}
                  getOptionLabel={(option) => option.name} // Assuming "name" is the property you want to display
                  renderInput={(params) => (
                    <TextField {...params} label="City" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="Street"
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="houseNumber"
                  label="number"
                  name="number"
                  onBlur={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="picture"
                  type="file"
                  name="picture"
                  onBlur={handleChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="picture">
                  <Button onChange={handleChange} variant="contained" component="span">
                    Upload Picture
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

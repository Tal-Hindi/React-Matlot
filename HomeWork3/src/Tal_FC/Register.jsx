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
import { loadUsers } from "./UserLocalStorage";

const city_options = data.default; // Access the default export from the imported module

const defaultTheme = createTheme();

export default function Register() {

//creating full details state
  const [userSignUpDetails, setUserSignUpDetails] = useState({
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

const [userIdCounter, setUserIdCounter] = useState(1); // id for each user

const [formErrors, setFormErrors] = useState({})

const generateUniqueId = () => { //increase id counter every time a new user is created
    const newId = userIdCounter;
    setUserIdCounter(prevCounter => prevCounter + 1);
    return newId;
}

function handleFileInputChange(event) {
  const { files } = event.target;

  // handle only the first selected file
  const selectedFile = files && files.length > 0 ? files[0] : null;

  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      setUserSignUpDetails((prevValue) => ({
        ...prevValue,
        picture: base64String, // Update the 'picture' field with the base64 string
      }));
    };

    reader.readAsDataURL(selectedFile); // Convert the file to base64
  }
}


const handleChange = (event) => {

    const { value, id } = event.target;  //Destructre

    //takes the prev value of the entire state and changes the current e element 
    setUserSignUpDetails(prevValue => ({
        ...prevValue,
        [id]: value,

    }));

}


const registerUser = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Create a new user object
    const newUser = {
        id: generateUniqueId(),
        ...userSignUpDetails
    };

    

    // Get existing users from localStorage
     const existingUsers = loadUsers();

    // Add the new user to the list
    const updatedUsers = [...existingUsers, newUser];

    // Update localStorage with the updated list of users
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setFormErrors(validate(userSignUpDetails));


    // Reset the form after successful registration
    setUserSignUpDetails({
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

const validate = (values) => {
  const errors ={}
 // const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if(!values.username){
    errors.username = "Username is required!"
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
                  id="fiestname"
                  name="firstname"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  value={userSignUpDetails.firstname}
                />
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={userSignUpDetails.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  onChange={handleChange}
                  value={userSignUpDetails.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  onChange={handleChange}
                  value={userSignUpDetails.username}
                />
                <p style={{color:"red"}}>{formErrors.username}</p>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={userSignUpDetails.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="passwordAuthentication"
                  label="Password Authentication"
                  type="password"
                  onChange={handleChange}
                  value={userSignUpDetails.passwordAuthentication}
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
                  onChange={handleChange}
                  value={userSignUpDetails.birthday}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="city"
                  onChange={handleChange}
                  
                  options={city_options || []}
                  getOptionLabel={(option) => option.name} // Assuming "name" is the property you want to display
                  renderInput={(params) => (
                    <TextField {...params} label="City" value={userSignUpDetails.city} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  onChange={handleChange}
                  value={userSignUpDetails.street}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="houseNumber"
                  label="number"
                  onChange={handleChange}
                  value={userSignUpDetails.houseNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="picture"
                  type="file"
                  onInput={handleFileInputChange}
                  style={{ display: "none" }}
                  value={userSignUpDetails.picture}
                />
                <label htmlFor="picture">
                  <Button onChange={handleChange} variant="contained" component="span">
                    Upload Picture
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Button
            onClick={registerUser}
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

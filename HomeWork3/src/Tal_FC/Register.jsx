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

const handleImageChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const imageDataUrl = reader.result;
    setUserSignUpDetails((prevUserDetails) => ({
      ...prevUserDetails,
      picture: imageDataUrl,
    }));
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};


const handleChange = (event) => {

    const { value, id } = event.target;  //Destructre

    //takes the prev value of the entire state and changes the current e element 
    setUserSignUpDetails(prevValue => ({
        ...prevValue,
        [id]: value,

    }));

}
const handleChangeCity = (e) =>{
  setUserSignUpDetails(prevValue => ({
    ...prevValue,
    ["city"]: e.target.innerHTML,

}));
}


const registerUser = (event) => {

  if (Object.keys(validate(userSignUpDetails)).length == 0){

  
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
    })

    document.getElementById("option").innerHTML="";

  }

   
    
}

const validate = (values) => {
  const errors = {};

  const requiredFields = ['username', 'password', 'firstname','lastname','passwordAuthentication','email',
  'city','street','houseNumber','picture','birthday'];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This is a required field!';
    }
  });

  // Additional validations...
  if (values.email && !values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i)) {
    errors.email = 'Invalid email address';
  }
  if (values.firstname && !values.firstname.match(/^[A-Za-z]+$/)) {
    errors.firstname = 'Invalid name';
  }
  if (values.lastname && !values.lastname.match(/^[A-Za-z]+$/)) {
    errors.lastname = 'Invalid name';
  }
  if (values.username && !values.username.match(/^[a-zA-Z0-9!@#$%^&*()-_+=|\\?<>{}[\]:;'".,~`]+$/)) {
    errors.username = 'Invalid username';
  }
  if (values.username && values.username.length > 60) {
    errors.username = 'Username must be less than 60 nchar';
  }
  if (values.password && !values.password.match(/^(?=.*\d)(?=.*[a-z]*)(?=.*[A-Z]*)(?=.*[!@#$%^&*()-_=+[\]{};:'",.<>?]).{7,12}$/)) {
    errors.password = 'Invalid password';
  }
  if (values.street && !values.street.match(/^[א-ת\s]*$/)) {
    errors.street = 'Invalid street';
  }
  if (values.houseNumber && !values.houseNumber.match(/^\d+$/)) {
    errors.houseNumber = 'Invalid house number';
  }
  if (values.passwordAuthentication && (values.passwordAuthentication != values.password)) {
    errors.password = 'Password dont match';
  }
 

  return errors;
};


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
                  id="firstname"
                  name="firstname"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  value={userSignUpDetails.firstname}
                />
                <p style={{color:"red"}}>{formErrors.firstname}</p>
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
                <p style={{color:"red"}}>{formErrors.lastname}</p>
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
                <p style={{color:"red"}}>{formErrors.email}</p>
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
                <p style={{color:"red"}}>{formErrors.password}</p>
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
                <p style={{color:"red"}}>{formErrors.passwordAuthentication}</p>
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
                <p style={{color:"red"}}>{formErrors.birthday}</p>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="option"
                  onChange={handleChangeCity}
                  options={city_options || []}
                  getOptionLabel={(option) => option.name} 
                
                  renderInput={(params) => (
                    <TextField {...params} label="City" id="city"/>
                  )}
                />
                <p style={{color:"red"}}>{formErrors.city}</p>
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
                <p style={{color:"red"}}>{formErrors.street}</p>
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
                <p style={{color:"red"}}>{formErrors.houseNumber}</p>
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/jpeg"
                  id="picture"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="picture">
                  <Button onChange={handleChange} variant="contained" component="span">
                    Upload Picture
                  </Button>
                </label>
                <p style={{color:"red"}}>{formErrors.picture}</p>
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

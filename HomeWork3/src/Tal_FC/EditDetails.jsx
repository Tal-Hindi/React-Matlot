import React, { useState } from 'react';
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
import Swal from 'sweetalert2';

const city_options = data.default;

const defaultTheme = createTheme();

const EditUser = ({ userDetails, onCancel, onSave }) => {
  const [userEditDetails, setUserEditDetails] = useState({
  ...userDetails
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { value, id } = event.target;
    setUserEditDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [id]: value,
    }));
  };

  const handleChangeCity = (e) => {
    setUserEditDetails((prevUserDetails) => ({
      ...prevUserDetails,
      ["city"]: e.target.innerHTML,
    }));
  };

  const validate = (values) => {
    const errors = {};
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
      if(values.birthday && validateDate(values.birthday) == "flase"){
       errors.birthday = "Age must be between 18 and 120";
      }
    return errors;
  };

  const handleSave = (event) => {
    event.preventDefault();
    const errors = validate(userEditDetails);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSave(userEditDetails);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();//read and save as base 64
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserSignUpDetails((prevUserDetails) => ({
        ...prevUserDetails,
        picture: reader.result // or imageDataUrl if you prefer URL
      }));
    };
  };

  const validateDate = (value) => {
    const [year, month, day] = value.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    let age =
      currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDiff =
      currentDate.getMonth() - selectedDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 &&
        currentDate.getDate() < selectedDate.getDate())
    ) {
      age--;
    }
    return (
      (age >= 18 && age <= 120) || "flase"
    );
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
            Edit Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSave}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* Display existing user details */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  value={userEditDetails.username}
                  error={Boolean(formErrors.username)}
                  helperText={formErrors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  onChange={handleChange}
                  value={userEditDetails.firstname}
                  error={Boolean(formErrors.firstname)}
                  helperText={formErrors.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  onChange={handleChange}
                  value={userEditDetails.lastname}
                  error={Boolean(formErrors.lastname)}
                  helperText={formErrors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={userEditDetails.email}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="birthday"
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
                  value={userEditDetails.birthday}
                  error={Boolean(formErrors.birthday)}
                  helperText={formErrors.birthday}
                />
              </Grid>
              {/* Add other fields as needed */}
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="option"
                  onChange={handleChangeCity}
                  options={city_options || []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      id="city"
                      error={Boolean(formErrors.city)}
                      helperText={formErrors.city}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="street"
                  label="Street"
                  onChange={handleChange}
                  value={userEditDetails.street}
                  error={Boolean(formErrors.street)}
                  helperText={formErrors.street}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="houseNumber"
                  label="number"
                  onChange={handleChange}
                  value={userEditDetails.houseNumber}
                  error={Boolean(formErrors.houseNumber)}
                  helperText={formErrors.houseNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/jpeg"
                  id="picture"
                  type="file"
                  onInput={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="picture">
                  <Button onChange={handleChange} variant="contained" component="span">
                    Upload Picture
                  </Button>
                </label>
                <p style={{color:"red"}}>{formErrors.picture}</p>
              </Grid>
              {/* ... Add other form fields */}
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={onCancel}
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditUser;

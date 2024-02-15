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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../index.css";

const city_options = data.default; // Access the default export from the imported module

const defaultTheme = createTheme();

export default function Register() {
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
    houseNumber: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data);
    // You can perform further actions here after form submission
  };

  const registerUser = (userData) => {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user data to the list, including the picture property
    const updatedUsers = [
      ...existingUsers,
      { ...userData, picture: userDetails.picture },
    ];

    // Update localStorage with the updated list of users
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Reset the form after successful registration
    setUserDetails({
      username: "",
      password: "",
      passwordAuthentication: "",
      picture: "", // Clear the picture data from state
      firstname: "",
      lastname: "",
      email: "",
      birthday: "",
      city: "",
      street: "",
      houseNumber: "",
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = reader.result; // Get the data URL representing the file

      // Update userDetails state with the picture URL
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        picture: imageDataUrl, // Set the picture URL directly
      }));
    };

    // Read the file as a data URL
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Read the file as a data URL

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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoComplete="given-name"
                  name="firstname"
                  id="firstname"
                  label="First Name"
                  autoFocus
                  {...register("firstname", {
                    required: "First Name is required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message:
                        "First Name must contain alphabetic characters only",
                    },
                  })}
                />
                {errors.firstname && (
                  <p className="errorC">{errors.firstname.message}</p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  {...register("lastname", {
                    required: "Last Name is required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message:
                        "Last Name must contain alphabetic characters only",
                    },
                  })}
                />
                {errors.lastname && (
                  <p className="errorC">{errors.lastname.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="errorC">{errors.email.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9!@#$%^&*()-_+=|\\?<>{}[\]:;'".,~`]+$/,
                      message:
                        "Username can only contain foreign letters, numbers, and special characters.",
                    },
                    maxLength: {
                      value: 60,
                      message: "Username cannot exceed 60 characters.",
                    },
                  })}
                />
                {errors.username && (
                  <p className="errorC">{errors.username.message}</p>
                )}
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
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+[\]{};:'",.<>?]).{7,12}$/,
                      message:
                        "Password must be between 7 and 12 characters long, and contain at least one special character, one capital letter, and one number.",
                    },
                  })}
                />
                {errors.password && (
                  <p className="errorC">{errors.password.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="passwordAuthentication"
                  name="passwordAuthentication"
                  label="Password Authentication"
                  type="password"
                  {...register("passwordAuthentication", {
                    required: "Password Authentication is required",
                    validate: (value) =>
                      value === watch("password") ||
                      "Password verification failed",
                  })}
                />
                {errors.passwordAuthentication && (
                  <p className="errorC">
                    {errors.passwordAuthentication.message}
                  </p>
                )}
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
                  {...register("birthday", {
                    required: "Birthday is required",
                    validate: (value) => {
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
                        (age >= 18 && age <= 120) ||
                        "Age must be between 18 and 120 years"
                      );
                    },
                  })}
                />
                {errors.birthday && (
                  <p className="errorC">{errors.birthday.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="city"
                  options={city_options || []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="City" />
                  )}
                  onChange={(event, value) => {
                    setValue("city", value ? value.name : "");
                  }}
                />
                {errors.city && <p className="errorC">{errors.city.message}</p>}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="Street"
                  {...register("street", {
                    required: "Street is required",
                    pattern: {
                      value: /^[א-ת\s]*$/, // Regular expression to match Hebrew letters and spaces
                      message: "Only Hebrew letters are allowed",
                    },
                  })}
                />
                {errors.street && (
                  <p className="errorC">{errors.street.message}</p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="houseNumber"
                  label="Number"
                  name="number"
                  {...register("houseNumber", {
                    required: "House Number is required",
                    pattern: {
                      value: /^\d+$/, // Regular expression to match positive numbers
                      message: "Only positive numbers are allowed",
                    },
                  })}
                />
                {errors.houseNumber && (
                  <p className="errorC">{errors.houseNumber.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/jpeg"
                  id="picture"
                  type="file"
                  name="picture"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="picture">
                  <Button variant="contained" component="span">
                    Upload Picture
                  </Button>
                </label>
                {/* Display the uploaded image preview */}
                {userDetails.picture && (
                  <img
                    src={userDetails.picture}
                    alt="Uploaded Image"
                    style={{
                      width: "100px",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                )}
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

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
  Autocomplete,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme } from "@mui/material/styles";
import * as data from "../israel_cities_names_and__geometric_data.json";
import "../index.css";

// Import city data
const cityOptions = data.default;

// Create default MUI theme
const defaultTheme = createTheme();

const Register = () => {
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

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    if (!userDetails.picture) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to upload picture first!",
      });
    } else {
      registerUser(data);
    }
  };

  // Register user and save data to localStorage
  const registerUser = (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [
      ...existingUsers,
      { ...userData, picture: userDetails.picture },
    ];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: "You have successfully registered!",
    });

    reset();

    // Reset form fields after successful registration
    // setUserDetails({
    //   ...userDetails,
    //   username: "",
    //   password: "",
    //   passwordAuthentication: "",
    //   picture: "",
    //   firstname: "",
    //   lastname: "",
    //   email: "",
    //   birthday: "",
    //   city: "",
    //   street: "",
    //   houseNumber: "",
    // });
  };

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        picture: imageDataUrl,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="firstname"
                  id="firstname"
                  label="First name"
                  placeholder="First Name"
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
              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  placeholder="Last name"
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
              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  placeholder="Email"
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
              {/* Username */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User name"
                  name="username"
                  placeholder="User name"
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
              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Password"
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
              {/* Password Authentication */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="passwordAuthentication"
                  name="passwordAuthentication"
                  label="Password Authentication"
                  placeholder="Password Authentication"
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
              {/* Birthday */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="birthday"
                  label="Birthday"
                  placeholder="Birthday"
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

              {/* City */}
              {/* TODO Fix the autocomplete onChange validation */}
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="city"
                  label="City"
                  placeholder="city"
                  options={cityOptions || []}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) =>
                    setValue("city", value ? value.name : "")
                  } // Update value when an option is selected
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      id="options"
                      {...register("city", {
                        required: "City is required",
                        pattern: {
                          value: /^[א-ת\s]*$/, // Regular expression to match Hebrew letters and spaces
                          message: "Only Hebrew letters are allowed",
                        },
                      })}
                    />
                  )}
                />
                {errors.city && <p className="errorC">{errors.city.message}</p>}
              </Grid>

              {/* Street */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="Street"
                  placeholder="Street"
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
              {/* House Number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="houseNumber"
                  label="Number"
                  name="number"
                  placeholder="Number"
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
              {/* Picture Upload */}
              <Grid item xs={12}>
                <input
                  accept="image/jpeg"
                  id="picture"
                  type="file"
                  name="picture"
                  onChange={(e) => {
                    handleImageChange(e);
                    register("picture"); // Register the file input
                  }}
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
            {/* Submit Button */}
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
};

export default Register;

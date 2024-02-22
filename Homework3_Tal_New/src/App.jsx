import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Register from "./components/Register.jsx";
import Swal from "sweetalert2";
import { userNameValidation, passwordValidation } from "./util/validation.js";
import loadUsers from "./util/loadUsers.js";
import EditDetails from "./components/EditDetails.jsx";
import SystemAdmin from "./components/SystemAdmin.jsx";

function App() {
  //State Variables
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [enteredUserName, setUserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [appUsers, setAppUsers] = useState([]);
  const [foundUser, setFoundUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [hideLoginComp, sethideLoginComp] = useState(true);
  const [hideRegisterComp, sethideRegisterComp] = useState(true);
  const [selectedPicture, setSelectedPicture] = useState(null);

  //toggleEditDetails Hide/Show~
  const toggleEdit = () => {
    setIsEdit((oldValue) => !oldValue);
  };

  //// Load users and set initial state
  useEffect(() => {
    const loadedUsers = loadUsers();
    setAppUsers(loadedUsers);

    const loggedInUserFromStorage = JSON.parse(
      sessionStorage.getItem("loggedInUser")
    );
    if (loggedInUserFromStorage) {
      setLoggedInUser(loggedInUserFromStorage);
      setFoundUser(loggedInUserFromStorage);
      sethideLoginComp(false);
      sethideRegisterComp(false);
      if (loggedInUserFromStorage.username == "admin") {
        setisAdmin(true);
      }
    }
  }, []);

  //Handle Submit-Login~
  function handleSubmitLogin(event) {
    event.preventDefault();

    setuserNameError(!userNameValidation(enteredUserName));
    setpasswordError(!passwordValidation(enteredPassword));

    if (enteredUserName == "admin" && enteredPassword == "ad12343211ad") {
      setisAdmin(true);
      const adminUser = { username: "admin", password: "ad12343211ad" };
      setLoggedInUser(adminUser);
      setFoundUser(adminUser);
      sessionStorage.setItem("loggedInUser", JSON.stringify(adminUser));
      sethideLoginComp(false);
      sethideRegisterComp(false);
      setEnteredPassword("");
      setUserName("");
    } else {
      setisAdmin(false);
      const foundUser = appUsers.find(
        (user) =>
          user.username === enteredUserName && user.password === enteredPassword
      );
      if (foundUser) {
        setLoggedInUser(foundUser);
        setFoundUser(foundUser);
        sessionStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        sethideRegisterComp(false);
        sethideLoginComp(false);
        setEnteredPassword("");
        setUserName("");

        Swal.fire({
          icon: "success",
          title: "You Logged IN ",
          text: "You have successfully loggin.",
        });
      } else {
        sethideLoginComp(true);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must sign up first",
        });
      }
    }
  }

  // Handle changes in the username input field
  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }
  // Handle changes in the password input field
  function handlePasswordChange(event) {
    setEnteredPassword(event.target.value);
  }
  // Reset form fields
  function handleReset(event) {
    event.preventDefault();
    setEnteredPassword("");
    setUserName("");
    setuserNameError(false);
    setpasswordError(false);
  }
  // Handle registration form submission
  const handleSubmitRegister = (formData) => {
    const existingUsers = appUsers;
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setAppUsers(updatedUsers);

    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "You have successfully registered.",
    });
  };

  //LogOut User Function~
  const logoutUser = (email) => {
    setLoggedInUser(false);
    setFoundUser(null);
    sethideLoginComp(true);
    sethideRegisterComp(true);
    console.log(email);

    const tempUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (tempUser && tempUser.email == email) {
      sessionStorage.clear();
    }
  };

  // Edit user details
  const editUser = (editedUser) => {
    const updatedUsers = appUsers.map((u) => {
      if (u.email == editedUser.email) return editedUser;
      else return u;
    });
    setAppUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers;
  };

  // Handle changes in user details
  const handleEditChange = (formData) => {
    const existingUsers = appUsers;
    const userIndex = existingUsers.findIndex(
      (u) => u.email === loggedInUser.email
    );
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...formData };
      localStorage.setItem("users", JSON.stringify(existingUsers));
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      if (loggedInUser && loggedInUser.email === formData.email) {
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...loggedInUser, ...formData })
        );
      }

      Swal.fire({
        icon: "success",
        title: "Details Updated",
        text: "You have successfully updated your details.",
      }).then(() => {
        // Pass the updated user object
        setFoundUser(formData);
        setLoggedInUser(formData);
      });
    } else {
      // Handle error if user not found
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User not found.",
      });
    }
  };

  // Handle picture selection
  const handlePictureSelect = (picture) => {
    // Update the selected picture state
    setSelectedPicture(picture);
  };

  // Delete user
  const deleteUser = (email) => {
    // Find the index of the user to be deleted
    const userIndex = appUsers.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      // If user exists, remove it from the array
      const updatedUsers = [
        ...appUsers.slice(0, userIndex),
        ...appUsers.slice(userIndex + 1),
      ];
      setAppUsers(updatedUsers);

      // Update the local storage or any other database with the updated user list
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Optionally, clear the session storage if the user being deleted is the logged-in user
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      if (loggedInUser && loggedInUser.email === email) {
        setLoggedInUser(null);
        setFoundUser(null);
        setisAdmin(false);
        sessionStorage.clear();
      }

      // Optionally, show a confirmation message or perform any other necessary actions
      console.log(`User with email ${email} has been deleted.`);
    } else {
      // Handle the case when the user with the provided email is not found
      console.log(`User with email ${email} does not exist.`);
    }
  };

  //Render AdminPanel Or User Profile Function~
  const renderAdminPanelOrProfile = () => {
    if (isAdmin) {
      return (
        <>
          <Profile
            foundUser={foundUser}
            logoutUser={logoutUser}
            onEdit={toggleEdit}
          />
          <SystemAdmin
            users={appUsers}
            deleteUser={deleteUser}
            onPictureSelect={handlePictureSelect}
            updateUser={editUser}
          />
        </>
      ); // or whatever you want to render for the admin
    } else if (foundUser) {
      return (
        <Profile
          foundUser={foundUser}
          logoutUser={logoutUser}
          onEdit={toggleEdit}
        />
      );
    } else {
      return null; // Handle the case when foundUser is not available
    }
  };

  return (
    <>
      <Header />
      <main>
        {foundUser ? (
          renderAdminPanelOrProfile()
        ) : (
          <>
            {hideRegisterComp && (
              <Register
                handleSubmit={handleSubmitRegister}
                onPictureSelect={handlePictureSelect}
                users={appUsers}
              />
            )}
            {hideLoginComp && (
              <Login
                onLogin={handleSubmitLogin}
                handleReset={handleReset}
                handleUserNameChange={handleUserNameChange}
                handlePasswordChange={handlePasswordChange}
                enteredUserName={enteredUserName}
                enteredPassword={enteredPassword}
                userNameError={userNameError}
                passwordError={passwordError}
              />
            )}
          </>
        )}

        {!isAdmin && isEdit && foundUser != null ? (
          <EditDetails
            handleEditChange={handleEditChange}
            editUser={editUser}
            userDetails={foundUser}
            onPictureSelect={handlePictureSelect}
          />
        ) : null}
      </main>
    </>
  );
}

export default App;

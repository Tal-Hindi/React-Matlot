import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Signup1 from "./components/SignUp1.jsx";
import Swal from "sweetalert2";
import { userNameValidation, passwordValidation } from "./util/validation.js";
import loadUsers from "./util/loadUsers.js";
import EditDetails from "./components/EditDetails.jsx";
import SystemAdmin from "./components/SystemAdmin.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [enteredUserName, setUserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [appUser, setAppUsers] = useState([]);
  const [foundUser, setFoundUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    console.log({ foundUser });
  }, [foundUser]);

  const toggleEdit = () => {
    setIsEdit((oldValue) => !oldValue);
  };

  useEffect(() => {
    const loadedUsers = loadUsers();
    setAppUsers(loadedUsers);
  }, []);

  function handleSubmitLogin(event) {
    event.preventDefault();

    setuserNameError(!userNameValidation(enteredUserName));
    setpasswordError(!passwordValidation(enteredPassword));

    if (enteredUserName == "admin" && enteredPassword == "ad12343211ad") {
      setisAdmin(true);
      const adminUser = { username: "admin", password: "ad12343211ad" };
      sessionStorage.setItem("loggedInUser", JSON.stringify(adminUser));
      setLoggedInUser(adminUser);
      setEnteredPassword("");
      setUserName("");
    } else {
      setisAdmin(false);
      const foundUser = appUser.find(
        (user) =>
          user.username === enteredUserName && user.password === enteredPassword
      );
      if (foundUser) {
        setLoggedInUser(foundUser);
        setFoundUser(foundUser);
        sessionStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        setEnteredPassword("");
        setUserName("");

        Swal.fire({
          icon: "success",
          title: "You Logged IN ",
          text: "You have successfully loggin.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must sign up first",
        });
      }
    }
  }

  const renderAdminPanel = () => {
    if (isAdmin) {
      return <SystemAdmin users={appUser} />; // or whatever you want to render for the admin
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

  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }

  function handlePasswordChange(event) {
    setEnteredPassword(event.target.value);
  }
  function handleReset(event) {
    event.preventDefault();
    setEnteredPassword("");
    setUserName("");
    setuserNameError(false);
    setpasswordError(false);
  }

  const handleSubmitSignUp = (formData) => {
    const existingUsers = appUser;
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setAppUsers(updatedUsers);

    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "You have successfully registered.",
    });
  };

  const logoutUser = (email) => {
    setLoggedInUser(false);
    setFoundUser(null);

    const arrayFromStorage = loadUsers();
    const indexToDelete = arrayFromStorage.findIndex(
      (obj) => obj.email === email
    );
    arrayFromStorage.splice(indexToDelete, 1);
    sessionStorage.setItem("registerdUsers", JSON.stringify(arrayFromStorage));
    sessionStorage.clear();
  };

  const handleEditSave = (prev) => {
    let updated = prev.map((u) => {
      if (u.email == editedUser.email) return editedUser;
      return u;
    });
    localStorage.setItem("users", JSON.stringify(updated));
    return updated;
  };

  const handleEditChange = (formData) => {
    const existingUsers = appUser;
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

  return (
    <>
      <Header />
      <main>
        {<Signup1 handleSubmit={handleSubmitSignUp} />}
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
        {renderAdminPanel()}
        {isEdit ? (
          <EditDetails
            handleEditChange={handleEditChange}
            handleEditSave={handleEditSave}
            userDetails={foundUser}
          />
        ) : null}
      </main>
    </>
  );
}

export default App;

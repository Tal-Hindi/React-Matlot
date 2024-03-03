import { useState } from "react";
import { userNameValidation, passwordValidation } from "../util/validation.js";
import Swal from "sweetalert2";

export default function Login({ onLogin }) {
  const [enteredUserName, setUserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setuserNameError(!userNameValidation(enteredUserName));
    setpasswordError(!passwordValidation(enteredPassword));

    const users = JSON.parse(localStorage.getItem("users") || []);

    const foundUser = users.find(
      (user) =>
        user.username === enteredUserName && user.password === enteredPassword
    );
    if (foundUser) {
      onLogin(foundUser);
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

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h2>Login</h2>
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="username">user name</label>
          <input
            id="username"
            type="text"
            name="username"
            onChange={handleUserNameChange}
            value={enteredUserName}
          />
          {userNameError && (
            <p className="control-error">
              Username can only contain foreign letters
              <br />, numbers, and special characters.
              <br /> Or cannot exceed 60 characters.
            </p>
          )}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            value={enteredPassword}
          />
          {passwordError && (
            <p className="control-error">
              Password must be between 7 and 12 <br />
              characters long, and contain <br />
              at least one special character,
              <br />
              one capital letter, <br />
              and one number.
            </p>
          )}
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

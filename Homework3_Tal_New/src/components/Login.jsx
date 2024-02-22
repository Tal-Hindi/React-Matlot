export default function Login({
  onLogin,
  handleReset,
  handleUserNameChange,
  handlePasswordChange,
  enteredUserName,
  enteredPassword,
  userNameError,
  passwordError,
}) {
  return (
    <form onSubmit={onLogin} onReset={handleReset}>
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

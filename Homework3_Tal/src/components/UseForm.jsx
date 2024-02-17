import { useState, useEffect } from "react";
import {
  firstNameValidation,
  housenumberValidation,
  isEmail,
  lastNameValidation,
  passwordValidation,
  streetValidation,
  userNameValidation,
  isEqualsToOtherValue,
  dateValidation,
} from "../util/validation.js";

const UserForm = ({ onSubmit, includeEmailField, onUpdate, user }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const newErrors = {};

    // Validations
    newErrors.passwordAreNotEqual = !isEqualsToOtherValue(
      data.password,
      data.confirmpassword
    );
    newErrors.username = !userNameValidation(data.username);
    newErrors.password = !passwordValidation(data.password);
    newErrors.firstname = !firstNameValidation(data.firstname);
    newErrors.lastname = !lastNameValidation(data.lastname);
    newErrors.email = !isEmail(data.email);
    newErrors.street = !streetValidation(data.street);
    newErrors.housenumber = !housenumberValidation(data.housenumber);
    newErrors.birthdate = !dateValidation(data.birthdate);

    if (includeEmailField) {
      newErrors.email = !isEmail(data.email);
    }

    const cities = ["תל אביב", "חדרה", "נתניה", "חיפה", "חולון"];
    newErrors.city = !cities.includes(data.city);

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      onSubmit(data);

      // Clear form and errors
      event.target.reset();
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {includeEmailField ? (
        <div>
          <h2>Welcome on board!</h2>
          <p>
            We just need a little bit of data from you to get you started 🚀
          </p>
        </div>
      ) : (
        <h2>Edit Details</h2>
      )}
      {/* User name */}
      <div className="control">
        <label htmlFor="username">User name</label>
        <input id="username" type="text" name="username" required />
        {errors.username && (
          <p className="control-error">
            Username can only contain foreign letters, numbers, and special
            characters. Or cannot exceed 60 characters.
          </p>
        )}
      </div>
      {/* Password */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
          {errors.password && (
            <p className="control-error">
              Password must be between 7 and 12 characters long, and contain at
              least one special character, one capital letter, and one number.
            </p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirmpassword"
            type="password"
            name="confirmpassword"
            required
          />
          {errors.passwordAreNotEqual && (
            <p className="control-error">Passwords must match.</p>
          )}
        </div>
      </div>
      <hr />
      {/* First name */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" name="firstname" required />
          {errors.firstname && (
            <p className="control-error">
              First Name must contain alphabetic characters only
            </p>
          )}
        </div>
        {/* Last name */}
        <div className="control">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" name="lastname" required />
          {errors.lastname && (
            <p className="control-error">
              Last Name must contain alphabetic characters only!
            </p>
          )}
        </div>
      </div>
      {/* Email */}
      <div className="control-row">
        {/* Email field is conditionally rendered */}

        <div className="control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={formData.email || ""}
            required
            disabled={formData.emailer ? true : false}
          />
          {errors.email && (
            <p className="control-error">Invalid email address format</p>
          )}
        </div>

        {/* Birthdate */}
        <div className="control">
          <label htmlFor="birthdate">Birth date</label>
          <input type="date" id="birthdate" name="birthdate" required />
          {errors.birthdate && (
            <p className="control-error">
              Age must be between 18 and 120 years
            </p>
          )}
        </div>
      </div>
      {/* City */}
      <div className="control">
        <label htmlFor="city">Pick a City</label>
        <input
          list="cities"
          id="city"
          name="city"
          autoComplete="off"
          required
        />
        <datalist id="cities">
          <option value="תל אביב" />
          <option value="חדרה" />
          <option value="נתניה" />
          <option value="חיפה" />
          <option value="חולון" />
        </datalist>
        {errors.city && (
          <p className="control-error">Please choose from the list..</p>
        )}
      </div>
      {/* Street */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" name="street" required />
          {errors.street && (
            <p className="control-error">Only Hebrew letters are allowed</p>
          )}
        </div>
        {/* HouseNumber */}
        <div className="control">
          <label htmlFor="housenumber">House number</label>
          <input type="number" id="housenumber" name="housenumber" required />
          {errors.housenumber && (
            <p className="control-error">Must be a number</p>
          )}
        </div>
      </div>
      <fieldset>
        {/* Picture */}
        <div className="control">
          <label htmlFor="picture">Upload picture</label>
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/jpg"
            required
          />
        </div>
      </fieldset>
      {/* For The Sign UP // */}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          {includeEmailField ? "Sign up" : "Update"}
        </button>
      </p>
    </form>
  );
};

export default UserForm;

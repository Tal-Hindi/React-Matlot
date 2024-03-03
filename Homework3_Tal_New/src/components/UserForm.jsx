import { useState } from "react";
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

const UserForm = ({ onSubmit, user, source, onPictureSelect, users }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [imagePath, setImagePath] = useState(null);
  const [pictureError, setPictureError] = useState("");

  // Function to handle form submission
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
    const cities = ["תל אביב", "חדרה", "נתניה", "חיפה", "חולון"];
    newErrors.city = !cities.includes(data.city);
    if (source == "signup") {
      newErrors.existemail = users.find((user) => user.email == data.email)
        ? true
        : false;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      onPictureSelect(imagePath);
      const combinedData = { ...data, picture: imagePath };
      onSubmit(combinedData);

      // Clear form and errors
      event.target.reset();
      setErrors({});
      // Reset picture field in formData state
      setFormData((prevFormData) => ({
        ...prevFormData,
        picture: null,
      }));
      setImagePath("");
    }
  };

  // Function to handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      if (!file.type.startsWith("image")) {
        setPictureError("Please select a valid image file.");
      } else {
        setPictureError("");
        reader.onload = () => {
          setImagePath(reader.result); // Set the image path to state
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {source === "signup" ? (
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
        <input
          id="username"
          type="text"
          name="username"
          defaultValue={user ? user.username : ""}
          required
        />
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
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={user ? user.password : ""}
            required
          />
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
            defaultValue={user ? user.confirmpassword : ""}
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
          <input
            type="text"
            id="firstname"
            name="firstname"
            defaultValue={user ? user.firstname : ""}
            required
          />
          {errors.firstname && (
            <p className="control-error">
              First Name must contain alphabetic characters only
            </p>
          )}
        </div>
        {/* Last name */}
        <div className="control">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            defaultValue={user ? user.lastname : ""}
            required
          />
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

        {source === "signup" ? (
          <div className="control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={formData.email || ""}
              required
            />
            {errors.email && (
              <p className="control-error">Invalid email address format</p>
            )}
            {errors.existemail && (
              <p className="control-error">This email is already registered</p>
            )}
          </div>
        ) : (
          <div className="control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email || ""}
              required
              readOnly
            />
            {errors.email && (
              <p className="control-error">Invalid email address format</p>
            )}
          </div>
        )}

        {/* Birthdate */}
        <div className="control">
          <label htmlFor="birthdate">Birth date</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            defaultValue={user ? user.birthdate : ""}
            required
          />
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
          autoComplete="on"
          defaultValue={user ? user.city : ""}
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
          <input
            type="text"
            id="street"
            name="street"
            defaultValue={user ? user.street : ""}
            required
          />
          {errors.street && (
            <p className="control-error">Only Hebrew letters are allowed</p>
          )}
        </div>
        {/* HouseNumber */}
        <div className="control">
          <label htmlFor="housenumber">House number</label>
          <input
            type="number"
            id="housenumber"
            name="housenumber"
            defaultValue={user ? user.housenumber : ""}
            required
          />
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
            onChange={handleImageChange}
            required
          />
        </div>
        {imagePath && (
          <div className="image-preview">
            <img src={imagePath} alt="Preview" className="preview-image" />
          </div>
        )}
        {/* Display picture error */}
        {pictureError && <p className="control-error">{pictureError}</p>}
      </fieldset>
      {/* For The Sign UP // */}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        {source === "signup" ? (
          <button type="submit" className="button">
            Sign Up
          </button>
        ) : (
          <button type="submit" className="button">
            Update
          </button>
        )}
      </p>
    </form>
  );
};

export default UserForm;

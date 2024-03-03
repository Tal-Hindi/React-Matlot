import { useState } from "react";
import UseForm from "./UseForm";
import Swal from "sweetalert2";
//check

const EditDetails = ({ user, onUpdate, onUpdateSuccess }) => {
  const [success, setSuccess] = useState(false);
  const [updateLoginUser, setUpdateLoginUser] = useState(user);

  const handleSubmit = (formData) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = existingUsers.findIndex((u) => u.email === user.email);

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

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Details Updated",
        text: "You have successfully updated your details.",
      }).then(() => {
        setSuccess(true);
        onUpdateSuccess(existingUsers[userIndex]); // Pass the updated user object
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
    <div>
      {!success && (
        <UseForm
          onSubmit={handleSubmit}
          user={updateLoginUser}
          includeEmailField={false}
          onUpdate={onUpdate} // Pass onUpdate function to the form
        />
      )}
      {success && <p>User details updated successfully!</p>}
    </div>
  );
};

export default EditDetails;

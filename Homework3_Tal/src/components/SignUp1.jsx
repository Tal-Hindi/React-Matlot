import UserForm from "./UseForm";
import Swal from "sweetalert2";

const Signup1 = () => {
  const handleSubmit = (formData) => {
    // Update local storage with the new user
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Show success message
    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "You have successfully registered.",
    });
  };

  return (
    <div>
      <UserForm onSubmit={handleSubmit} includeEmailField={true} />
    </div>
  );
};

export default Signup1;

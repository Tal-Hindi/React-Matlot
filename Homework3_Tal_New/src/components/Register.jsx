import UserForm from "./UserForm";

const Register = ({ handleSubmit, onPictureSelect, users }) => {
  return (
    <div>
      <UserForm
        onSubmit={handleSubmit}
        source="signup"
        onPictureSelect={onPictureSelect}
        users={users}
      />
    </div>
  );
};

export default Register;

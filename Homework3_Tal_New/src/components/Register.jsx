import UserForm from "./UserForm";

const Register = ({ handleSubmit, onPictureSelect }) => {
  return (
    <div>
      <UserForm
        onSubmit={handleSubmit}
        source="signup"
        onPictureSelect={onPictureSelect}
      />
    </div>
  );
};

export default Register;

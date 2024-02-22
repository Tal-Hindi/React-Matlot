import UserForm from "./UserForm";

const Signup1 = (onSignup) => {
  return (
    <div>
      <UserForm onSubmit={onSignup} source="signup" />
    </div>
  );
};

export default Signup1;

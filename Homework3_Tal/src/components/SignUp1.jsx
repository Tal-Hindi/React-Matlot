import UserForm from "./UserForm";

const Signup1 = (props) => {
  return (
    <div>
      <UserForm onSubmit={props.handleSubmit} source="signup" />
    </div>
  );
};

export default Signup1;

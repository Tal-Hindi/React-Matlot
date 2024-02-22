import UserForm from "./UserForm";
const EditDetails = ({ handleEditChange, userDetails }) => {
  return (
    <div>
      <UserForm
        onSubmit={handleEditChange}
        user={userDetails}
        source="editDetails"
      />

      <p>User details updated successfully!</p>
    </div>
  );
};
export default EditDetails;

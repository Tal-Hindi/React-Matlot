import UserForm from "./UserForm";
const EditDetails = ({ handleEditChange, userDetails, onEditSave }) => {
  return (
    <div>
      <UserForm
        onSubmit={handleEditChange}
        user={userDetails}
        source="editDetails" // Pass onUpdate function to the form
      />

      <p>User details updated successfully!</p>
    </div>
  );
};
export default EditDetails;

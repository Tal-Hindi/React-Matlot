import UserForm from "./UserForm";
const EditDetails = ({ handleEditChange, userDetails, onPictureSelect }) => {
  return (
    <div>
      <UserForm
        onSubmit={handleEditChange}
        user={userDetails}
        source="editDetails"
        onPictureSelect={onPictureSelect} // Pass onUpdate function to the form
      />

      <p>User details updated successfully!</p>
    </div>
  );
};
export default EditDetails;

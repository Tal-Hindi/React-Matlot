import UserForm from "./UserForm";
const EditDetails = ({ handleEditChange, userDetails, onPictureSelect }) => {
  return (
    <div>
      <UserForm
        onSubmit={handleEditChange}
        user={userDetails}
        source="editDetails"
        onPictureSelect={onPictureSelect}
      />
    </div>
  );
};
export default EditDetails;

export default function loadUsers() {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  return existingUsers;
}

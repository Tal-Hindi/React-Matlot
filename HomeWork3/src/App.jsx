import "./App.css";
import Register from "./Tal_FC/Register";
import Login from "./Tal_FC/Login";
import Profile from "./Tal_FC/Profile";
import EditDetails from "./Tal_FC/EditDetails";
import SystemAdmin from "./Tal_FC/SystemAdmin";

function App() {
  return (
    <>
      <Register />
      <Login />
      <Profile/>
      <EditDetails />
      <SystemAdmin />

    </>
  );
}

export default App;

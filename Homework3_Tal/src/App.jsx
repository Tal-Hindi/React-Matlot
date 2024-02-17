import { useState } from "react";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Signup1 from "./components/SignUp1.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSubmit = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser("");
    sessionStorage.removeItem("loggedInUser");
  };

  return (
    <>
      <Header />
      <main>
        <Signup1 />
        <Login onLogin={handleSubmit} />
        {loggedInUser && (
          <Profile user={loggedInUser} onLogout={handleLogout} />
        )}
      </main>
    </>
  );
}

export default App;

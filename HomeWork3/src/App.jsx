import "./App.css";
import Register from "./Tal_FC/Register";
import Login from "./Tal_FC/Login";
import React, { useState , useEffect} from 'react'
import { loadUsers } from "./Tal_FC/UserLocalStorage";



function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadedUsers = loadUsers();
    setUsers(loadedUsers);
  });

  return (
    <>
      <Register />
      <Login />
    </>
  );
}

export default App;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Avia_FC/Register'
import Login from './Avia_FC/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Register/>
      <Login/>
    </>
  )
}

export default App

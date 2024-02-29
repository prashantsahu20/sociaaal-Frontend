import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger"; 
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {

  const {user} =useContext(AuthContext);
  console.log(user);
  return (
      <Router>
      <Routes>
      <Route path='/' element={user ?<Home/> :<Register/>} />
      <Route path='/login' element={user?<Navigate to="/"/> :<Login/>} />
      <Route path='/register' element={user?<Navigate to="/"/> :<Register/>} />
      <Route path='/messenger' element={!user?<Navigate to="/"/> :<Messenger/>} />
      <Route path='/profile/:username' element={<Profile/>} />
      </Routes>
      </Router>
  );
}

export default App;

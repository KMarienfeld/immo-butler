import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import UseLogin from "./login/UseLogin";

function App() {
    const {login, user} = UseLogin()

  return (
    <div>
        <Routes>
        <Route path={"/login"} element={<Login login={login}/>}/>
        </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import UseLogin from "./login/UseLogin";
import Header from "./header/Header";
import ProtectedRoutes from "./login/ProtectedRoutes";

function App() {
    const {login, user} = UseLogin()

  return (
    <div>
        <Routes>
            <Route path={"/login"} element={<Login login={login}/>}/>
            <Route element={<ProtectedRoutes user={user}/>}>
                <Route path={"/all-bills"} element={<Header/>}/>
                <Route path={"/all-expense-category"} element={<Header/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;

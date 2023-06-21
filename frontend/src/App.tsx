import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import UseLogin from "./login/UseLogin";
import Header from "./header/Header";
import ProtectedRoutes from "./login/ProtectedRoutes";
import AddExpenseCategories from "./expense-categories/AddExpenseCategories";
import ExpenseCategoriesGallery from "./expense-categories/ExpenseCategoriesGallery";

function App() {
    const {login, user, getUsername} = UseLogin()
    useEffect(()=> getUsername, [])

  return (
    <div>
        {user === "" || user === "anonymousUser" ?  <> </> : <Header/>}
        <Routes>
            <Route path={"/login"} element={<Login login={login}/>}/>
            <Route element={<ProtectedRoutes user={user}/>}>
                <Route path={"/add-expense-categories"} element={<AddExpenseCategories/>}/>
                <Route path={"/all-expense-categories"} element={<ExpenseCategoriesGallery/>}/>
            </Route>
        </Routes>
    </div>
  );
}
export default App;

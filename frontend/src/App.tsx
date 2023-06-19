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
    useEffect(()=>console.log("app.tsx"))
    useEffect(() => getUsername, [])

  return (
    <div>
        <Routes>
            <Route path={"/login"} element={<Login login={login} getUsername={getUsername}/>}/>
            <Route element={<ProtectedRoutes user={user}/>}>
                <Route path={"/"} element={<Header/>}/>
                <Route path={"/all-bills"} element={<Header/>}/>
                <Route path={"/add-expense-categories"} element={
                    <>
                        <Header/>
                        <AddExpenseCategories/>
                    </>
                }/>
                <Route path={"/all-expense-categories"} element={
                    <>
                        <Header/>
                        <ExpenseCategoriesGallery/>
                    </>
                }/>
            </Route>
        </Routes>
    </div>
  );
}
export default App;

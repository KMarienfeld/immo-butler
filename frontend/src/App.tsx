import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import UseLogin from "./login/UseLogin";
import Header from "./header/Header";
import ProtectedRoutes from "./login/ProtectedRoutes";
import AddExpenseCategories from "./expense-categories/AddExpenseCategories";
import ExpenseCategoryCard from "./expense-categories/ExpenseCategoryCard";
import ExpenseCategoriesGallery from "./expense-categories/ExpenseCategoriesGallery";

function App() {
    const {login, user} = UseLogin()

  return (
    <div>
        <Routes>
            <Route path={""} element={<Login login={login}/>}/>
            <Route path={"/login"} element={<Login login={login}/>}/>
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
            <Route element={<ProtectedRoutes user={user}/>}>
                <Route path={"/all-bills"} element={<Header/>}/>
                <Route path={"/all-expense-categories"} element={<Header/>}/>
            </Route>
        </Routes>
    </div>
  );
}
export default App;

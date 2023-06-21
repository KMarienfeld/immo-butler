import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import UseLogin from "./login/UseLogin";
import Header from "./header/Header";
import ProtectedRoutes from "./login/ProtectedRoutes";
import AddExpenseCategories from "./expense-categories/AddExpenseCategories";
import ExpenseCategoriesGallery from "./expense-categories/ExpenseCategoriesGallery";
import useGetAllExpenseCategories from "./hooks/useGetAllExpenseCategories";
import EditExpenseCategory from "./expense-categories/EditExpenseCategory";

function App() {
    const {login, user, getUsername} = UseLogin()
    const {getAllExpanseCategories,listOfExpenseCategories } = useGetAllExpenseCategories();

    useEffect(getAllExpanseCategories, [])
    useEffect(()=> getUsername, [])

  return (
    <div>
        {user === "" || user === "anonymousUser" ?  <> </> : <Header/>}
        <Routes>
            <Route path={"/login"} element={<Login login={login}/>}/>
            <Route element={<ProtectedRoutes user={user}/>}>
                <Route path={"/add-expense-categories"} element={<AddExpenseCategories getAllExpanseCategories={getAllExpanseCategories}/>}/>
                <Route path={"/all-expense-categories"} element={<ExpenseCategoriesGallery getAllExpanseCategories={getAllExpanseCategories} listOfExpenseCategories={listOfExpenseCategories}/>}/>
                <Route path={"all-expense-categories/expense-category/:id"} element={<EditExpenseCategory getAllExpanseCategories={getAllExpanseCategories} listOfExpenseCategories={listOfExpenseCategories}/>}/>
            </Route>
        </Routes>
    </div>
  );
}
export default App;

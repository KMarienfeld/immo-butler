import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import UseLogin from "./login/UseLogin";
import Header from "./header/Header";
import ProtectedRoutes from "./login/ProtectedRoutes";
import AddExpenseCategories from "./expense-categories/AddExpenseCategories";
import ExpenseCategoriesGallery from "./expense-categories/ExpenseCategoriesGallery";
import EditExpenseCategory from "./expense-categories/EditExpenseCategory";
import useGetAllExpenseCategories from "./hooks/useGetAllExpenseCategories";

function App() {
    const {login, user} = UseLogin()
    const {getAllExpanseCategories, expenseCategoryList} = useGetAllExpenseCategories();
    useEffect(getAllExpanseCategories, [])

  return (
    <div>
        <Routes>
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
                    <ExpenseCategoriesGallery expenseCategories={expenseCategoryList}/>
                </>
            }/>
            <Route path={"all-expense-categories/expense-category/:id"} element={
                <>
                    <Header/>
                    <EditExpenseCategory expenseCategories={expenseCategoryList}/>
                </>
            }/>
            <Route element={<ProtectedRoutes user={user}/>}>
                <Route path={""} element={<Header/>}/>
                <Route path={"/all-bills"} element={<Header/>}/>

            </Route>
        </Routes>
    </div>
  );
}
export default App;

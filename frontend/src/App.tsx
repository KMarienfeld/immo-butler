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
import AddUtilityBill from "./utility-bills/AddUtilityBill";
import DetailOfUtilityBill from "./utility-bills/DetailOfUtilityBill";
import useGetAllUtilityBills from "./hooks/useGetAllUtilityBills";
import AllUtilityBills from "./utility-bills/AllUtilityBills";

function App() {
    const {login, user, getUsername} = UseLogin()
    const {getAllExpanseCategories, listOfExpenseCategories} = useGetAllExpenseCategories();
    const {getAllUtilityBills, listOfUtilityBills} = useGetAllUtilityBills();

    useEffect(getAllExpanseCategories,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user])

    useEffect(() => getUsername,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    useEffect(getAllUtilityBills,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user])

    return (
        <div>
            {user === "" || user === "anonymousUser" ? <> </> : <Header/>}
            <Routes>
                <Route path={"/login"} element={<Login login={login}/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/add-expense-categories"}
                           element={<AddExpenseCategories getAllExpanseCategories={getAllExpanseCategories}/>}/>
                    <Route path={"/all-expense-categories"}
                           element={<ExpenseCategoriesGallery getAllExpenseCategories={getAllExpanseCategories}
                                                              listOfExpenseCategories={listOfExpenseCategories}/>}/>
                    <Route path={"all-expense-categories/expense-category/:id"}
                           element={<EditExpenseCategory getAllExpenseCategories={getAllExpanseCategories}
                                                         listOfExpenseCategories={listOfExpenseCategories}/>}/>
                    <Route path={"/all-bills"} element={<AllUtilityBills listOfUtilityBills={listOfUtilityBills}
                                                                         getAllUtilityBills={getAllUtilityBills}/>}/>
                    <Route path={"/add-utility-bill"}
                           element={<AddUtilityBill listOfExpenseCategories={listOfExpenseCategories}
                                                    getAllUtilityBills={getAllUtilityBills}/>}/>
                    <Route path={"/all-bills/utility-bill/:id"}
                           element={<DetailOfUtilityBill listOfUtilityBills={listOfUtilityBills}
                                                         getAllUtilityBills={getAllUtilityBills}/>}/>
            </Route>
        </Routes>
    </div>
  );
}
export default App;

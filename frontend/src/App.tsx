import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import UseLogin from "./login/UseLogin";
import Header from "./header/Header";
import ProtectedRoutes from "./login/ProtectedRoutes";
import AddExpenseCategories from "./buyAndHold/expense-categories/AddExpenseCategories";
import AddUtilityBill from "./buyAndHold/utility-bills/AddUtilityBill";
import DetailOfUtilityBill from "./buyAndHold/utility-bills/DetailOfUtilityBill";
import useGetAllUtilityBills from "./buyAndHold/hooks/useGetAllUtilityBills";
import AllUtilityBills from "./buyAndHold/utility-bills/AllUtilityBills";
import AllRealEstates from "./buyAndHold/real-estate/AllRealEstates";
import AddRealEstate from "./buyAndHold/real-estate/AddRealEstate";
import useGetAllRealEstates from "./buyAndHold/hooks/useGetAllRealEstates";
import EditRealEstate from "./buyAndHold/real-estate/EditRealEstate";
import EditExpenseCategory from "./buyAndHold/expense-categories/EditExpenseCategory";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./login/SignUp";


function App() {
    const {login, user, getUsername, logout} = UseLogin()
    const {getAllUtilityBills, listOfUtilityBills} = useGetAllUtilityBills();
    const {getAllRealEstates, listOfRealEstates} = useGetAllRealEstates();

    useEffect(() => getUsername,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getAllUtilityBills, [user])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getAllRealEstates, [user])

    return (
        <div>
            {!user || user === "anonymousUser" ? <> </> : <Header logout={logout}/>}
            <ToastContainer/>
            <Routes>
                <Route path={"/login"} element={<Login login={login}/>}/>
                <Route path={"/sign-up"} element={<SignUp/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/all-real-estates"}
                           element={<AllRealEstates listOfRealEstates={listOfRealEstates}/>}/>
                    <Route path={"/add-real-estates"}
                           element={<AddRealEstate getAllRealEstates={getAllRealEstates}/>}/>
                    <Route path={"/all-real-estates/real-estate/:id"}
                           element={<EditRealEstate listOfRealEstates={listOfRealEstates}
                                                    getAllRealEstates={getAllRealEstates}/>}/>
                    <Route path={"/all-real-estates/real-estate/:id/expense-category/add"}
                           element={<AddExpenseCategories listOfRealEstates={listOfRealEstates}
                                                          getAllRealEstates={getAllRealEstates}/>}/>
                    <Route path={"/all-real-estates/real-estate/:realEstateID/expense-category/edit/:expenseCategoryID"}
                           element={<EditExpenseCategory getAllRealEstates={getAllRealEstates}
                                                         listOfRealEstates={listOfRealEstates}/>}/>
                    <Route path={"/all-utility-bills"}
                           element={<AllUtilityBills listOfUtilityBills={listOfUtilityBills}
                                                     getAllUtilityBills={getAllUtilityBills}/>}/>
                    <Route path={"/add-utility-bill"}
                           element={<AddUtilityBill getAllUtilityBills={getAllUtilityBills}
                                                    listOfRealEstates={listOfRealEstates}/>}/>
                    <Route path={"/all-bills/utility-bill/:id"}
                           element={<DetailOfUtilityBill listOfUtilityBills={listOfUtilityBills}
                                                         getAllUtilityBills={getAllUtilityBills}/>}/>
                </Route>
        </Routes>
    </div>
  );
}
export default App;

import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import UseLogin from "./login/UseLogin";
import Header from "./header/Header";
import ProtectedRoutes from "./login/ProtectedRoutes";
import AddExpenseCategories from "./expense-categories/AddExpenseCategories";
import AddUtilityBill from "./utility-bills/AddUtilityBill";
import DetailOfUtilityBill from "./utility-bills/DetailOfUtilityBill";
import useGetAllUtilityBills from "./hooks/useGetAllUtilityBills";
import AllUtilityBills from "./utility-bills/AllUtilityBills";
import AllRealEstates from "./real-estate/AllRealEstates";
import AddRealEstate from "./real-estate/AddRealEstate";
import useGetAllRealEstates from "./hooks/useGetAllRealEstates";
import EditRealEstate from "./real-estate/EditRealEstate";

function App() {
    const {login, user, getUsername} = UseLogin()
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
            {!user || user === "anonymousUser" ? <> </> : <Header/>}
            <Routes>
                <Route path={"/login"} element={<Login login={login}/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/all-real-estates"}
                           element={<AllRealEstates listOfRealEstates={listOfRealEstates}/>}/>
                    <Route path={"/add-real-estates"} element={<AddRealEstate getAllRealEstates={getAllRealEstates}/>}/>
                    <Route path={"/all-real-estates/real-estate/:id"}
                           element={<EditRealEstate listOfRealEstates={listOfRealEstates}
                                                    getAllRealEstates={getAllRealEstates}/>}/>
                    <Route path={"/all-real-estates/real-estate/expense-category/add/:id"}
                           element={<AddExpenseCategories listOfRealEstates={listOfRealEstates}
                                                          getAllRealEstates={getAllRealEstates}/>}/>
                    <Route path={"/all-real-estates/real-estate/:realEstateID/expense-category/edit/:expenseCategoryID"}
                           element={<AddExpenseCategories getAllRealEstates={getAllRealEstates}
                                                          listOfRealEstates={listOfRealEstates}/>}/>
                    <Route path={"/all-bills"} element={<AllUtilityBills listOfUtilityBills={listOfUtilityBills}
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

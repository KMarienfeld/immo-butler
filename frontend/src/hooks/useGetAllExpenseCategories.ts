import React, {useState} from 'react';
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import axios from "axios";

function UseGetAllExpenseCategories() {
    const [listOfExpenseCategories, setListOfExpenseCategories] = useState<ExpenseCategoryModel[]>([]);
    function getAllExpanseCategories() {
        axios.get("/api/expenseCategory/get-all")
            .then(response => response.data)
            .then(data =>{
                setListOfExpenseCategories(data);
                console.log(data)
            })
            .catch(error => console.log(error))
    }
    return {listOfExpenseCategories, getAllExpanseCategories}
}

export default UseGetAllExpenseCategories;
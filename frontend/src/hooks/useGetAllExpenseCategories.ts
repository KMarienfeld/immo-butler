import React, {useState} from 'react';
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import axios from "axios";

function UseGetAllExpenseCategories() {
    const [expenseCategoryList, setExpenseCategoryList] = useState<ExpenseCategoryModel[]>([]);
    function getAllExpanseCategories() {
        axios.get("/api/expenseCategory/get-all")
            .then(response => response.data)
            .then(data =>{
                setExpenseCategoryList(data);
                console.log(data)
            })
            .catch(error => console.log(error))
    }
    return {expenseCategoryList, getAllExpanseCategories}
}

export default UseGetAllExpenseCategories;
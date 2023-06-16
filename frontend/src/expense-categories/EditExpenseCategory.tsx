import React from 'react';
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import {useParams} from "react-router-dom";

type Props = {
    expenseCategories: ExpenseCategoryModel[]
}
function EditExpenseCategory(props:Props) {

    const params = useParams();
    const id:string|undefined = params.id
    const actualExpenseCategory: ExpenseCategoryModel| undefined = props.expenseCategories.find(currentExpenseCategory => props.expenseCategories,id === id);


    return (
        <div></div>
    );
}

export default EditExpenseCategory;
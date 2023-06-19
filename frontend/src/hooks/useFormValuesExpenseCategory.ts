import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ExpenseCategoryDTOModel} from "../model/ExpenseCategoryDTOModel";
import axios from "axios";



export default function useFormValuesExpenseCategory() {
    const navigate = useNavigate();
    const [expanseCategoryN, setExpanseCategoryN] = useState<string>("")
    const [distributionKeyN, setDistributionKeyN] = useState<string>("")
    const [totalN, setTotalN] = useState<number>(0)
    const [portionN, setPortionN] = useState<number>(0)
    const [distributionKeyIsCONSUMPTIONBASEDKEY, setDistributionKeyIsCONSUMPTIONBASEDKEY] = useState<boolean>(false)


    function onClickGoBack() {
        navigate("/all-expense-categories")
    }

    function onChangeHandlerExpenseCategory(e:ChangeEvent<HTMLInputElement>) {
        setExpanseCategoryN(e.target.value)
    }

    function onChangeHandlerDistributionKey(e:ChangeEvent<HTMLSelectElement>) {
        const selectedValue = e.target.value;
        setDistributionKeyN(selectedValue);
        setDistributionKeyIsCONSUMPTIONBASEDKEY(selectedValue === "CONSUMPTIONBASEDKEY");
    }

    function onChangeHandlerTotal(e:ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setTotalN(Number(value))
    }

    function onChangeHandlerPortion(e:ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setPortionN(Number(value))
    }

    function addNewExpenseCategory(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newExpenseCategory:ExpenseCategoryDTOModel = {
            expanseCategory:expanseCategoryN,
            distributionKey:distributionKeyN,
            total:totalN, portion:portionN
        }
        axios.post('api/expenseCategory/add', newExpenseCategory)
            .then(response => {
                console.log(response.data)
            })
            .then(()=> navigate("/all-expense-categories"))
            .catch(error => console.log(error))
    }

    function editExpenseCategoryById(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const editedExpenseCategory: ExpenseCategoryDTOModel = {
            expanseCategory: expanseCategoryN,
            distributionKey:distributionKeyN,
            total:totalN, portion:portionN
        }
        axios.put('api/expenseCategory/edit', editedExpenseCategory)
            .then(r => {
                console.log(r.data)
            })
            .then(() => navigate("/all-expense-categories"))
            .catch(error => console.log(error))
    }

    return{expanseCategoryN, distributionKeyN, totalN, portionN, distributionKeyIsCONSUMPTIONBASEDKEY,
        onClickGoBack,onChangeHandlerExpenseCategory,onChangeHandlerDistributionKey, onChangeHandlerTotal, onChangeHandlerPortion, addNewExpenseCategory, editExpenseCategoryById }
}


import React, {useEffect, useState} from 'react';
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import axios from "axios";
import ExpenseCategoryCard from "./ExpenseCategoryCard";
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./ExpenseCategoryCard.css"
function ExpenseCategoriesGallery() {

    const [expenseCategoryList, setExpenseCategoryList] = useState<ExpenseCategoryModel[]>([]);
    const navigate = useNavigate();

    useEffect(getAllExpanseCategories, [])
    function getAllExpanseCategories() {
        axios.get("api/expenseCategory/get-all")
            .then(response => response.data)
            .then(data =>{
                setExpenseCategoryList(data);
                console.log(data)
            })
            .catch(error => console.log(error))
    }

    function buttonNewExpenseCategory() {
        navigate("/add-expense-categories")
    }

    return (
        <div>
            {expenseCategoryList.length === 0 ?
                <div className="pageContent">
                <Container className="pt-5 d-flex justify-content-center">
                    <h4 className="text-center">du hast bisher noch keine Kostenstelle angelegt, starte direkt mit deiner ersten Kostenstelle!</h4>
                </Container>
                <Container className="d-flex justify-content-center mt-5">
                    <Button className="buttonNewExpenseCategory" onClick={buttonNewExpenseCategory} >neue Kostenart anlegen</Button>
                </Container>
                </div> :
                expenseCategoryList.map(expenseCategory =>
                    <ExpenseCategoryCard expenseCategory={expenseCategory}/>
                )
            }
        </div>
    );
}

export default ExpenseCategoriesGallery;
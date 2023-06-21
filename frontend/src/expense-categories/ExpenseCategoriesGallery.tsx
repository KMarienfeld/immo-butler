import React from 'react';
import ExpenseCategoryCard from "./ExpenseCategoryCard";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./ExpenseCategoryCard.css"
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";

type Props = {
    listOfExpenseCategories:ExpenseCategoryModel[],
    getAllExpanseCategories: () => void
}
function ExpenseCategoriesGallery(props:Props) {

    const navigate = useNavigate();

    function buttonNewExpenseCategory() {
        navigate("/add-expense-categories")
    }

    return (
        <div>
            {props.listOfExpenseCategories.length === 0 ?
                <div className="pageContent">
                    <Container className="pt-5 d-flex justify-content-center">
                        <h4 className="text-center">
                            du hast bisher noch keine Kostenstelle angelegt, starte direkt mit deiner ersten Kostenart!
                        </h4>
                    </Container>
                    <Container className="d-flex justify-content-center mt-5">
                        <Button className="buttonNewExpenseCategory" onClick={buttonNewExpenseCategory} >
                            neue Kostenart anlegen
                        </Button>
                    </Container>
                </div> :
                <div className="pageContent">
                    <Container className="pt-5 d-flex justify-content-center">
                        <h3 className="text-center">
                            Hier siehst du alle deine angelegten Kostenarten
                        </h3>
                    </Container>
                    <Container className="mt-4 mb-4">
                        <Row>
                            {props.listOfExpenseCategories.map(currentExpenseCategory => (
                                <Col md={4} key={currentExpenseCategory.id}>
                                        <ExpenseCategoryCard  expenseCategory={currentExpenseCategory}/>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <Container className="d-flex pb-5 justify-content-center mt-5">
                        <Button className="buttonNewExpenseCategory" onClick={buttonNewExpenseCategory}>
                            neue Kostenart anlegen
                        </Button>
                    </Container>
                </div>
            }
        </div>
    );
}

export default ExpenseCategoriesGallery;
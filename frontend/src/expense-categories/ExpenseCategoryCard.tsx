import React from 'react';
import {Button, Card, Container, ListGroup, Row} from "react-bootstrap";
import "./ExpenseCategoryCard.css"
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import {useNavigate} from "react-router-dom";

type Props = {
    expenseCategory: ExpenseCategoryModel
}
function ExpenseCategoryCard(props:Props) {
const navigate = useNavigate();

    function buttonNewExpenseCategory() {
        navigate("/add-expense-categories")
    }

    return (
        <div>
            <div className="pageContent">
                <Container className="pt-5 d-flex justify-content-center">
                    <h3 className="text-center">Hier siehst du alle deine angelegten Kostenarten</h3>
                </Container>
                <Container className="d-flex justify-content-center mt-4 mb-4">
                    <Card className="expenseCategoryCard" style={{ width: '18rem' }}>
                        <Card.Header>
                            Kostenart: {props.expenseCategory.expanseCategory}
                        </Card.Header>
                            {props.expenseCategory.total === 0 ?
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Umlageschlüssel: {props.expenseCategory.distributionKey}</ListGroup.Item>
                                </ListGroup>
                                    :
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Umlageschlüssel: {props.expenseCategory.distributionKey}</ListGroup.Item>
                                    <ListGroup.Item>Gesamt: {props.expenseCategory.total}</ListGroup.Item>
                                    <ListGroup.Item>Anteil: {props.expenseCategory.portion} </ListGroup.Item>
                                </ListGroup>
                            }
                    </Card>
                </Container>
                <Container className="d-flex justify-content-center mt-5">
                    <Button className="buttonNewExpenseCategory" onClick={buttonNewExpenseCategory}>neue Kostenart anlegen</Button>
                </Container>
            </div>
        </div>
    );
}

export default ExpenseCategoryCard;
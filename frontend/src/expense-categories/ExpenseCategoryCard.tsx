import React from 'react';
import {Button, Card, Container, ListGroup, Row} from "react-bootstrap";
import "./ExpenseCategoryCard.css"
import {useNavigate} from "react-router-dom";
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";

type Props = {
    expenseCategory: ExpenseCategoryModel
}
function ExpenseCategoryCard(props:Props) {
const navigate = useNavigate();

    function buttonNewExpenseCategory() {
        navigate("/add-expense-categories")
    }

    function getDistributionKeyLabel(distributionKey:string) {
        switch (distributionKey) {
            case "AREABASEDKEY":
                return "Wohnfläche";
            case "PERSONBASEDKEY":
                return "Personenzahl";
            case "CONSUMPTIONBASEDKEY":
                return "Direktzuordnung";
            case "UNITBASEDKEY":
                return "Wohneinheiten";
            default:
                return "";
        }
    }
    return (
        <div>
                <Container className="d-flex justify-content-center mt-4 mb-4">
                    <Card className="expenseCategoryCard" style={{ width: '18rem' }}>
                        <Card.Header>
                            Kostenart: {props.expenseCategory.expanseCategory}
                        </Card.Header>
                            {props.expenseCategory.total === 0 ?
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Umlageschlüssel: {getDistributionKeyLabel(props.expenseCategory.distributionKey)}</ListGroup.Item>
                                </ListGroup>
                                    :
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Umlageschlüssel: {getDistributionKeyLabel(props.expenseCategory.distributionKey)}</ListGroup.Item>
                                    <ListGroup.Item>Gesamt: {props.expenseCategory.total}</ListGroup.Item>
                                    <ListGroup.Item>Anteil: {props.expenseCategory.portion} </ListGroup.Item>
                                </ListGroup>
                            }
                    </Card>
                </Container>
            </div>
    );
}

export default ExpenseCategoryCard;
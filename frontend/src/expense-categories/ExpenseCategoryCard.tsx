import React from 'react';
import {Card, Container, ListGroup} from "react-bootstrap";
import "./ExpenseCategoryCard.css"
import {useNavigate} from "react-router-dom";
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";

type Props = {
    expenseCategory: ExpenseCategoryModel
}
function ExpenseCategoryCard(props:Props) {
const navigate = useNavigate();

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
    function clickToExpenseCategoryEdit() {
        navigate("/all-expense-categories/expense-category/" + props.expenseCategory.id)
    }

    return (
        <div>
                <Container className="d-flex justify-content-center mt-4 mb-4">
                    <button className="cardButtonExpenseCategory btn-unstyled" onClick={() => clickToExpenseCategoryEdit()}>
                        <Card className="expenseCategoryCard" style={{ width: '18rem' }}>
                            <Card.Header>
                                Kostenart: {props.expenseCategory.expenseCategory}
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
                    </button>
                </Container>
            </div>
    );
}

export default ExpenseCategoryCard;
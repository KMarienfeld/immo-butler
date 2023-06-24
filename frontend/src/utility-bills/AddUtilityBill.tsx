import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import ExpenseCategoryForBillFormCard from "./ExpenseCategoryForBillFormCard";
import "./AddUtilityBill.css";
import {HouseAddFill, HouseDash} from "react-bootstrap-icons";

type Props = {
    listOfExpenseCategories: ExpenseCategoryModel[],
    getAllExpanseCategories: () => void,
}

function AddUtilityBill(props: Props) {

    function addNewUtilityBill() {

    }

    function onChangeHandlerYear() {

    }

    function onChangeHandlerPrepaymentMonthly() {

    }

    function onClickGoBack() {

    }

    function onClickAddNextExpenseCategoryForBillFormCard() {

    }

    return (
        <div>
            <Row className="mt-5">
                <Container className="d-flex justify-content-center">
                    <h3 className="text-center">Lege hier eine neue Nebenkostenabrechnung an:</h3>
                </Container>
            </Row>
            <Container className="mt-5">
                <Form onSubmit={addNewUtilityBill}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group as={Col} controlId="formGridTotal" className="mb-3">
                                <Form.Label>Jahr der Abrechnung:</Form.Label>
                                <Form.Control className="formControlTotal"
                                              placeholder="Trage hier das Jahr der Abrechnung ein, z.B. 2022"
                                              onChange={onChangeHandlerYear} pattern="[0-9]{4}"
                                              title="Bitte geben das Kalenderjahr ein"/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Col} controlId="formGridPortion">
                                <Form.Label>monatliche Vorauszahlung:</Form.Label>
                                <Form.Control className="formControlTotal"
                                              placeholder="geleistete Vorauszahlung in Monaten"
                                              onChange={onChangeHandlerPrepaymentMonthly} pattern="[0-9]*"
                                              title="Bitte geben Sie nur ganze Zahlen ein"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <ExpenseCategoryForBillFormCard listOfExpenseCategories={props.listOfExpenseCategories}/>
                    </Row>
                    <Row className="mt-3 buttonPlus">
                        <Col>
                            <Button className="buttonNextExpenseCategoryForBillFormCard m-2"
                                    onClick={onClickAddNextExpenseCategoryForBillFormCard} variant="success">
                                <HouseAddFill></HouseAddFill>
                            </Button>

                            <Button className="buttonNextExpenseCategoryForBillFormCard"
                                    onClick={onClickAddNextExpenseCategoryForBillFormCard} variant="outline-danger">
                                <HouseDash></HouseDash>

                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Button className="buttonBack" variant="outline-dark" onClick={onClickGoBack}>
                                zurück
                            </Button>
                        </Col>
                        <Col>
                            <Button className="buttonSubmit" type="submit">
                                Abrechnung erstellen
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>


        </div>
    );
}

export default AddUtilityBill;
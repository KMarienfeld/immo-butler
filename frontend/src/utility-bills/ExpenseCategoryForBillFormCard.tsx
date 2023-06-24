import React from 'react';
import {Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {QuestionCircleFill} from "react-bootstrap-icons";
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import "./ExpenseCategoryForBillFormCard.css";


type Props = {
    listOfExpenseCategories: ExpenseCategoryModel[],
}

function ExpenseCategoryForBillFormCard(props: Props) {
    const infoContentExpenseCategoryForBillFormCard = (
        <Tooltip id="tooltip">Bei Auswahl einer erstellen Kostenart greift automatisch der dort hinterlegte
            Umlageschlüssel.</Tooltip>);

    function onChangeHandlerExpenseCategory() {

    }

    function onChangeHandlerTotalBill() {

    }

    return (
        <div>
            <Container className="mt-5 expenseCategoryForBillFormCard">
                <OverlayTrigger trigger={['hover', 'click']}
                                overlay={infoContentExpenseCategoryForBillFormCard}>
                    <div><QuestionCircleFill className="question-icon"/></div>
                </OverlayTrigger>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group as={Col} className="mb-3" controlId="formGridSelectExpenseCategory">
                            <Form.Label>
                                Kostenart:
                            </Form.Label>
                            <Form.Select defaultValue="Wähle hier eine Kostenart aus..."
                                         onChange={onChangeHandlerExpenseCategory}>
                                <option disabled>Wähle hier eine Kostenart aus...</option>
                                <option value="AREABASEDKEY">Wohnfläche</option>
                                <option value="PERSONBASEDKEY">Personenzahl</option>
                                <option value="CONSUMPTIONBASEDKEY">Direktzuordnung</option>
                                <option value="UNITBASEDKEY">Wohneinheiten</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group as={Col} controlId="formGridTotalBill">
                            <div></div>
                            <Form.Label>Jahresbeitrag:</Form.Label>
                            <Form.Control placeholder="Trage hier den Jahresbeitrag ein"
                                          onChange={onChangeHandlerTotalBill}
                                          pattern="[0-9]*([.,][0-9]+)?"
                                          title="Es können nur Zahlen eintragen"/>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ExpenseCategoryForBillFormCard;
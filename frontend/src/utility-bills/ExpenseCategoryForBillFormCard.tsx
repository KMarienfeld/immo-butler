import React from 'react';
import {Button, Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {QuestionCircleFill} from "react-bootstrap-icons";
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";

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

    function onClickDeleteActualExpenseCategoryForBillFormCard() {

    }

    function onClickAddNextExpenseCategoryForBillFormCard() {

    }

    return (
        <div>
            <Container className="mt-5">
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formGridSelectExpenseCategory">
                        <Form.Label>Kostenart
                            <OverlayTrigger trigger={['hover', 'click']}
                                            overlay={infoContentExpenseCategoryForBillFormCard}>
                                <div><QuestionCircleFill className="question-icon"/></div>
                            </OverlayTrigger>
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
                    <Form.Group as={Col} controlId="formGridTotalBill">
                        <Form.Label>Jahresbeitrag</Form.Label>
                        <Form.Control placeholder="Trage hier den Jahresbeitrag ein" onChange={onChangeHandlerTotalBill}
                                      pattern="[0-9]*([.,][0-9]+)?"
                                      title="Es können nur Zahlen eintragen"/>
                    </Form.Group>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Button className="buttonDeleteExpenseCategoryForBillFormCard" variant="outline-dark"
                                onClick={onClickDeleteActualExpenseCategoryForBillFormCard}>
                            zurück
                        </Button>
                    </Col>
                    <Col>
                        <Button className="buttonNextExpenseCategoryForBillFormCard"
                                onClick={onClickAddNextExpenseCategoryForBillFormCard}>
                            +
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ExpenseCategoryForBillFormCard;
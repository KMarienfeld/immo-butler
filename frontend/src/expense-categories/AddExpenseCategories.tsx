import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import "./AddExpenseCategories.css"
import {useNavigate} from "react-router-dom";
import {ExpenseCategoryDTOModel} from "../model/ExpenseCategoryDTOModel";
import axios from "axios";
import {QuestionCircleFill} from 'react-bootstrap-icons'
import useAddingExpenseCategory from "../hooks/useFormValuesExpenseCategory"
function AddExpenseCategories() {
    const infoContent = (<Tooltip id="tooltip">Da beim Umlageschlüssel 'Direktzuordnung' keine Berechnung benötigt wird, müssen die Felder 'Gesamt' und 'Anteil' nicht befüllt werden. </Tooltip>);
    const {distributionKeyIsCONSUMPTIONBASEDKEY,
        onClickGoBack,onChangeHandlerExpenseCategory,onChangeHandlerDistributionKey, onChangeHandlerTotal, onChangeHandlerPortion, addNewExpenseCategory } = useAddingExpenseCategory();

    return (
        <div>
            <Row className="mt-5">
                <Container className="d-flex justify-content-center">
                    <h3 className="text-center">Hier kannst du eine neue Kostenstelle anlegen:</h3>
                </Container>
            </Row>
            <Container className="mt-5">
                <Form onSubmit={addNewExpenseCategory}>
                    <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                        <Form.Label>Kostenart</Form.Label>
                        <Form.Control placeholder="Trage hier die Kostenart ein" onChange={onChangeHandlerExpenseCategory}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridDistributionKey">
                        <Form.Label>Umlageschlüssel
                            <OverlayTrigger trigger={['hover', 'click']} overlay={infoContent}><div><QuestionCircleFill className="question-icon"/></div></OverlayTrigger>
                        </Form.Label>
                        <Form.Select defaultValue="Wähle hier einen Umlageschlüssel aus..." onChange={onChangeHandlerDistributionKey}>
                            <option disabled>Wähle hier einen Umlageschlüssel aus...</option>
                            <option value="AREABASEDKEY">Wohnfläche</option>
                            <option value="PERSONBASEDKEY">Personenzahl</option>
                            <option value="CONSUMPTIONBASEDKEY">Direktzuordnung</option>
                            <option value="UNITBASEDKEY">Wohneinheiten</option>
                        </Form.Select>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridTotal">
                            <Form.Label>Gesamt</Form.Label>
                            <Form.Control placeholder="Referenz" onChange={onChangeHandlerTotal} pattern="[0-9]*"
                                          title="Bitte geben Sie nur Zahlen ein" disabled={distributionKeyIsCONSUMPTIONBASEDKEY}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPortion">
                            <Form.Label>Anteil</Form.Label>
                            <Form.Control placeholder="Wohneinheitsanteil" onChange={onChangeHandlerPortion} pattern="[0-9]*"
                                          title="Bitte geben Sie nur ganze Zahlen ein" disabled={distributionKeyIsCONSUMPTIONBASEDKEY}/>
                        </Form.Group>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Button className="buttonBack" variant="outline-dark" onClick={onClickGoBack}>
                                zurück
                            </Button>
                        </Col>
                        <Col>
                            <Button className="buttonSubmit" type="submit">
                                Kostenart speichern
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default AddExpenseCategories;
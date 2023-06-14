import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./AddExpenseCategories.css"
import {useNavigate} from "react-router-dom";
function AddExpenseCategories() {

    const navigate = useNavigate();

    function onClickBackButton() {
        navigate("/all-expense-categories")
    }

    return (
        <div>
            <Row className="mt-5">
                <Container className="d-flex justify-content-center">
                    <h3 className="text-center">Hier kannst du eine neue Kostenstelle anlegen:</h3>
                </Container>
            </Row>
            <Container className="mt-5">
                <Form>
                    <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                        <Form.Label>Kostenart</Form.Label>
                        <Form.Control placeholder="Trage hier die Kostenart ein" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridDistributionKey">
                        <Form.Label>Umlageschlüssel</Form.Label>
                        <Form.Select defaultValue="Wähle hier einen Umlageschlüssel aus...">
                            <option disabled>Wähle hier einen Umlageschlüssel aus...</option>
                            <option>Wohnfläche</option>
                            <option>Wohneinheiten</option>
                            <option>Personenzahl</option>
                            <option>Direktzuordnung</option>
                            <option>Wohneinheiten</option>
                        </Form.Select>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridTotal">
                            <Form.Label>Gesamt</Form.Label>
                            <Form.Control placeholder="Referenz" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPortion">
                            <Form.Label>Anteil</Form.Label>
                            <Form.Control placeholder="Wohneinheitsanteil" />
                        </Form.Group>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Button className="buttonBack" variant="outline-dark" type="submit" onClick={onClickBackButton}>
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
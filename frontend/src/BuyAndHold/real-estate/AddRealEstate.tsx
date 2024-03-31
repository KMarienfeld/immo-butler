import React, {useState} from 'react';
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import useFormValuesRealEstate from "../hooks/useFormValuesRealEstate";
import {RealEstateDto} from "../model/RealEstateDTO";
import axios from "axios";
import {useNavigate} from "react-router-dom";

type Props = {
    getAllRealEstates: () => void;
}

function AddRealEstate(props: Props) {
    const {
        onChangeHandlerDesignationOfRealEstate,
        designationOfRealEstateN,
        onChangeHandlerRoadOfRealEstate,
        roadOfRealEstateN,
        onChangeHandlerHouseNumberOfRealEstate,
        houseNumberOfRealEstateN,
        onChangeHandlerPostCodeOfRealEstate,
        postCodeOfRealEstateN,
        onChangeHandlerLocationOfRealEstate,
        locationOfRealEstateN,
        onChangeHandlerGenderOfTenant,
        genderOfTenantN,
        onChangeHandlerFirstNameOfTenant,
        firstNameOfTenantN,
        onChangeHandlerLastNameOfTenant,
        lastNameOfTenantN,
        onClickGoBack
    }
        = useFormValuesRealEstate();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleShow();
    }

    function addNewRealEstate() {
        const newRealEstate: RealEstateDto = {
            designationOfRealEstate: designationOfRealEstateN,
            roadOfRealEstate: roadOfRealEstateN,
            houseNumberOfRealEstate: houseNumberOfRealEstateN,
            postCodeOfRealEstate: postCodeOfRealEstateN,
            locationOfRealEstate: locationOfRealEstateN,
            genderOfTenant: genderOfTenantN,
            firstNameOfTenant: firstNameOfTenantN,
            lastNameOfTenant: lastNameOfTenantN,
            listOfExpenseCategories: [],
            utilityBills: []
        }
        axios.post("/api/realEstate/add", newRealEstate)
            .then(r => {
                console.log(r.data)
            })
            .then(props.getAllRealEstates)
            .then(() => navigate("/all-real-estates"))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <Row className="mt-5">
                <Container className="d-flex justify-content-center">
                    <h3 className="text-center">Hier kannst du deine Immobilie anlegen:</h3>
                </Container>
            </Row>
            <Container className="mt-5">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                        <Form.Label>Immobilienbezeichnung:</Form.Label>
                        <Form.Control placeholder="Trage hier eine Bezeichnung ein"
                                      onChange={onChangeHandlerDesignationOfRealEstate}/>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridTotal">
                            <Form.Label>Straße:</Form.Label>
                            <Form.Control placeholder="Straße der Immobilie"
                                          onChange={onChangeHandlerRoadOfRealEstate}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPortion">
                            <Form.Label>Hausnummer:</Form.Label>
                            <Form.Control placeholder="HausNr der Immobilie"
                                          onChange={onChangeHandlerHouseNumberOfRealEstate}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridTotal">
                            <Form.Label>Postleitzahl:</Form.Label>
                            <Form.Control placeholder="PLZ der Immobilie" onChange={onChangeHandlerPostCodeOfRealEstate}
                                          pattern="[0-9]*" title="Bitte nur Zahlen eintragen"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPortion">
                            <Form.Label>Ort</Form.Label>
                            <Form.Control placeholder="Ort der Immobilie"
                                          onChange={onChangeHandlerLocationOfRealEstate}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="formGridDistributionKey">
                            <Form.Label>
                                Anrede:
                            </Form.Label>
                            <Form.Select defaultValue="FEMALE" onChange={onChangeHandlerGenderOfTenant}>
                                <option value="FEMALE">Frau</option>
                                <option value="MALE">Herr</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                            <Form.Label>Trage hier den Namen des Mieters ein:</Form.Label>
                            <Form.Control placeholder="Vorname des Mieters"
                                          onChange={onChangeHandlerFirstNameOfTenant}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridExpenseCategory">

                            <Form.Control placeholder="Nachname des Mieters"
                                          onChange={onChangeHandlerLastNameOfTenant}/>
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
                                Immobilie anlegen
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Neue Immobilie anlegen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sicher, dass du diese Immobilie anlegen möchtest?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose} className="goBackButtonModal">
                        zurück
                    </Button>
                    <Button variant="primary" onClick={addNewRealEstate}
                            className="submitButtonModal">ja</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default AddRealEstate;
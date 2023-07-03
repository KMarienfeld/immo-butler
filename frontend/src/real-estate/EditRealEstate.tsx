import React, {FormEvent, useEffect} from 'react';
import {RealEstateModel} from "../model/RealEstateModel";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import useFormValuesRealEstate from "../hooks/useFormValuesRealEstate";
import {RealEstateDto} from "../model/RealEstateDTO";
import axios from "axios";

type Props = {
    listOfRealEstates: RealEstateModel[]
    getAllRealEstates: () => void
}

function EditRealEstate(props: Props) {
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
        onClickGoBack,
        setDesignationOfRealEstateN,
        setRoadOfRealEstateN,
        setHouseNumberOfRealEstateN,
        setPostCodeOfRealEstateN,
        setLocationOfRealEstateN,
        setGenderOfTenantN,
        setFirstNameOfTenantN,
        setLastNameOfTenantN
    }
        = useFormValuesRealEstate();
    const navigate = useNavigate();
    const params = useParams();
    const id: string | undefined = params.id;
    let actualRealEstate: RealEstateModel | undefined;

    if (props.listOfRealEstates.length > 0) {
        actualRealEstate = props.listOfRealEstates.find(currentRealEstate => currentRealEstate.id === id);
    }

    useEffect(() => {
        if (designationOfRealEstateN === "") {
            setDesignationOfRealEstateN(actualRealEstate?.designationOfRealEstate ?? "");
        }
        if (roadOfRealEstateN === "") {
            setRoadOfRealEstateN(actualRealEstate?.roadOfRealEstate ?? "");
        }
        if (houseNumberOfRealEstateN === "") {
            setHouseNumberOfRealEstateN(actualRealEstate?.houseNumberOfRealEstate ?? "");
        }
        if (postCodeOfRealEstateN === 0) {
            setPostCodeOfRealEstateN(actualRealEstate?.postCodeOfRealEstate ?? 0);
        }
        if (locationOfRealEstateN === "") {
            setLocationOfRealEstateN(actualRealEstate?.locationOfRealEstate ?? "")
        }
        if (genderOfTenantN === "") {
            setGenderOfTenantN(actualRealEstate?.genderOfTenant ?? "")
        }
        if (firstNameOfTenantN === "") {
            setFirstNameOfTenantN(actualRealEstate?.firstNameOfTenant ?? "")
        }
        if (lastNameOfTenantN === "") {
            setLastNameOfTenantN(actualRealEstate?.lastNameOfTenant ?? "")
        }
    })

    function editRealEstate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const editedRealEstateDto: RealEstateDto = {
            designationOfRealEstate: designationOfRealEstateN,
            roadOfRealEstate: roadOfRealEstateN,
            houseNumberOfRealEstate: houseNumberOfRealEstateN,
            postCodeOfRealEstate: postCodeOfRealEstateN,
            locationOfRealEstate: locationOfRealEstateN,
            genderOfTenant: genderOfTenantN,
            firstNameOfTenant: firstNameOfTenantN,
            lastNameOfTenant: lastNameOfTenantN
        }
        axios.put("/api/realEstate/edit/" + id, editedRealEstateDto)
            .then(r => {
                console.log(r.data)
            })
            .then(props.getAllRealEstates)
            .then(() => navigate("/all-real-estates"))
            .catch(error => console.log(error))
    }

    function onClickDelete() {
        axios.delete("/api/realEstate/delete/" + id)
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
                    <h3 className="text-center">Hier kannst du deine Immobiliendaten bearbeiten:</h3>
                </Container>
            </Row>
            <Container className="mt-5">
                <Form onSubmit={editRealEstate}>
                    <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                        <Form.Label>Immobilienbezeichnung:</Form.Label>
                        <Form.Control placeholder={actualRealEstate?.designationOfRealEstate}
                                      onChange={onChangeHandlerDesignationOfRealEstate}/>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridTotal">
                            <Form.Label>Straße:</Form.Label>
                            <Form.Control placeholder={actualRealEstate?.roadOfRealEstate}
                                          onChange={onChangeHandlerRoadOfRealEstate}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPortion">
                            <Form.Label>Hausnummer:</Form.Label>
                            <Form.Control placeholder={actualRealEstate?.houseNumberOfRealEstate}
                                          onChange={onChangeHandlerHouseNumberOfRealEstate}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridTotal">
                            <Form.Label>Postleitzahl:</Form.Label>
                            <Form.Control placeholder={actualRealEstate?.postCodeOfRealEstate.toString()}
                                          onChange={onChangeHandlerPostCodeOfRealEstate}
                                          pattern="[0-9]*" title="Bitte nur Zahlen eintragen"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPortion">
                            <Form.Label>Ort</Form.Label>
                            <Form.Control placeholder={actualRealEstate?.locationOfRealEstate}
                                          onChange={onChangeHandlerLocationOfRealEstate}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="formGridDistributionKey">
                            <Form.Label>
                                Anrede:
                            </Form.Label>
                            <Form.Select defaultValue={actualRealEstate?.genderOfTenant}
                                         onChange={onChangeHandlerGenderOfTenant}>
                                <option value="FEMALE">Frau</option>
                                <option value="MALE">Herr</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                            <Form.Label>Trage hier den Namen des Mieters ein:</Form.Label>
                            <Form.Control placeholder={actualRealEstate?.firstNameOfTenant}
                                          onChange={onChangeHandlerFirstNameOfTenant}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridExpenseCategory">

                            <Form.Control placeholder={actualRealEstate?.lastNameOfTenant}
                                          onChange={onChangeHandlerLastNameOfTenant}/>
                        </Form.Group>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Button className="buttonDelete" variant="danger" onClick={onClickDelete}>
                                löschen
                            </Button>
                        </Col>
                        <Col>
                            <Button className="buttonSubmit" type="submit">
                                Änderung speichern
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-5">
                        <Col>
                            <Button className="buttonBack" variant="outline-dark"
                                    onClick={onClickGoBack}>zurück</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default EditRealEstate;
import React, {FormEvent, useEffect} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import useFormValuesRealEstate from "../hooks/useFormValuesRealEstate";
import {RealEstateModel} from "../model/RealEstateModel";
import {RealEstateDto} from "../model/RealEstateDTO";
import {useNavigate} from "react-router-dom";
import useEditRealEstate from "../hooks/useEditRealEstate";
import axios from "axios";

type Props = {
    actualRealEstate: RealEstateModel | undefined,
    getAllRealEstates: () => void
}

function EditGeneralRealEstate(props: Props) {
    const {} = useEditRealEstate(props);
    const navigate = useNavigate();
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

    useEffect(() => {
        if (designationOfRealEstateN === "") {
            setDesignationOfRealEstateN(props.actualRealEstate?.designationOfRealEstate ?? "");
        }
        if (roadOfRealEstateN === "") {
            setRoadOfRealEstateN(props.actualRealEstate?.roadOfRealEstate ?? "");
        }
        if (houseNumberOfRealEstateN === "") {
            setHouseNumberOfRealEstateN(props.actualRealEstate?.houseNumberOfRealEstate ?? "");
        }
        if (postCodeOfRealEstateN === 0) {
            setPostCodeOfRealEstateN(props.actualRealEstate?.postCodeOfRealEstate ?? 0);
        }
        if (locationOfRealEstateN === "") {
            setLocationOfRealEstateN(props.actualRealEstate?.locationOfRealEstate ?? "")
        }
        if (genderOfTenantN === "") {
            setGenderOfTenantN(props.actualRealEstate?.genderOfTenant ?? "")
        }
        if (firstNameOfTenantN === "") {
            setFirstNameOfTenantN(props.actualRealEstate?.firstNameOfTenant ?? "")
        }
        if (lastNameOfTenantN === "") {
            setLastNameOfTenantN(props.actualRealEstate?.lastNameOfTenant ?? "")
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
            lastNameOfTenant: lastNameOfTenantN,
            listOfExpenseCategories: []
        }
        axios.put("/api/realEstate/edit/" + props.actualRealEstate?.id, editedRealEstateDto)
            .then(r => {
                console.log(r.data)
            })
            .then(props.getAllRealEstates)
            .then(() => navigate("/all-real-estates"))
            .catch(error => console.log(error))
    }

    function onClickDelete() {
        axios.delete("/api/realEstate/delete/" + props.actualRealEstate?.id)
            .then(r => {
                console.log(r.data)
            })
            .then(props.getAllRealEstates)
            .then(() => navigate("/all-real-estates"))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <Form onSubmit={editRealEstate}>
                <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                    <Form.Label>Immobilienbezeichnung:</Form.Label>
                    <Form.Control placeholder={props.actualRealEstate?.designationOfRealEstate}
                                  onChange={onChangeHandlerDesignationOfRealEstate}/>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTotal">
                        <Form.Label>Straße:</Form.Label>
                        <Form.Control placeholder={props.actualRealEstate?.roadOfRealEstate}
                                      onChange={onChangeHandlerRoadOfRealEstate}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPortion">
                        <Form.Label>Hausnummer:</Form.Label>
                        <Form.Control placeholder={props.actualRealEstate?.houseNumberOfRealEstate}
                                      onChange={onChangeHandlerHouseNumberOfRealEstate}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTotal">
                        <Form.Label>Postleitzahl:</Form.Label>
                        <Form.Control placeholder={props.actualRealEstate?.postCodeOfRealEstate.toString()}
                                      onChange={onChangeHandlerPostCodeOfRealEstate}
                                      pattern="[0-9]*" title="Bitte nur Zahlen eintragen"/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPortion">
                        <Form.Label>Ort</Form.Label>
                        <Form.Control placeholder={props.actualRealEstate?.locationOfRealEstate}
                                      onChange={onChangeHandlerLocationOfRealEstate}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="formGridDistributionKey">
                        <Form.Label>
                            Anrede:
                        </Form.Label>
                        <Form.Select defaultValue={props.actualRealEstate?.genderOfTenant}
                                     onChange={onChangeHandlerGenderOfTenant}>
                            <option value="FEMALE">Frau</option>
                            <option value="MALE">Herr</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                        <Form.Label>Trage hier den Namen des Mieters ein:</Form.Label>
                        <Form.Control placeholder={props.actualRealEstate?.firstNameOfTenant}
                                      onChange={onChangeHandlerFirstNameOfTenant}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridExpenseCategory">

                        <Form.Control placeholder={props.actualRealEstate?.lastNameOfTenant}
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
        </div>
    );
}

export default EditGeneralRealEstate;
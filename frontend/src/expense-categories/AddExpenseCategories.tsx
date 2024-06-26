import React, {useState} from 'react';
import {Button, Col, Container, Form, FormControl, Modal, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import "./AddExpenseCategories.css"
import {useParams} from "react-router-dom";
import {QuestionCircleFill} from 'react-bootstrap-icons'
import useFormValuesExpenseCategory from "../hooks/useFormValuesExpenseCategory";
import {RealEstateModel} from "../model/RealEstateModel";
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import {RealEstateDto} from "../model/RealEstateDTO";
import useEditRealEstate from "../hooks/useEditRealEstate";
import {v4} from "uuid";


type Props = {
    getAllRealEstates: () => void,
    listOfRealEstates: RealEstateModel[]
}

function AddExpenseCategories(props: Props) {
    const {editRealEstate} = useEditRealEstate(props);
    const infoContent = (
        <Tooltip id="tooltip">Da beim Umlageschlüssel 'Direktzuordnung' keine Berechnung benötigt wird, müssen die
            Felder 'Gesamt' und 'Anteil' nicht befüllt werden. </Tooltip>);
    const {
        expenseCategoryN,
        distributionKeyN,
        totalN,
        portionN,
        distributionKeyIsCONSUMPTIONBASEDKEY,
        onClickGoBack,
        onChangeHandlerExpenseCategory,
        onChangeHandlerDistributionKey,
        onChangeHandlerTotal,
        onChangeHandlerPortion
    } = useFormValuesExpenseCategory();

    const params = useParams();
    const id: string | undefined = params.id;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleShow();
    }

    let actualRealEstate: RealEstateModel | undefined;


    if (props.listOfRealEstates.length > 0) {
        actualRealEstate = props.listOfRealEstates.find(currentRealEstate => currentRealEstate.id === id);
    }

    function addNewExpenseCategory() {
        const newExpenseCategory: ExpenseCategoryModel = {
            expenseCategory: expenseCategoryN,
            distributionKey: distributionKeyN,
            total: totalN, portion: portionN,
            id: v4()
        }
        if (actualRealEstate) {
            const updatedListOfExpenseCategories = [...actualRealEstate.listOfExpenseCategories || [], newExpenseCategory];
            const editedRealEstate: RealEstateDto = {
                designationOfRealEstate: actualRealEstate.designationOfRealEstate,
                roadOfRealEstate: actualRealEstate.roadOfRealEstate,
                houseNumberOfRealEstate: actualRealEstate.houseNumberOfRealEstate,
                postCodeOfRealEstate: actualRealEstate.postCodeOfRealEstate,
                locationOfRealEstate: actualRealEstate.locationOfRealEstate,
                genderOfTenant: actualRealEstate.genderOfTenant,
                firstNameOfTenant: actualRealEstate.firstNameOfTenant,
                lastNameOfTenant: actualRealEstate.lastNameOfTenant,
                listOfExpenseCategories: updatedListOfExpenseCategories,
                utilityBills: actualRealEstate.utilityBills
            }
            editRealEstate(actualRealEstate.id, editedRealEstate);
        }
    }

    return (
        <div>
            <Row className="mt-5">
                <Container className="d-flex justify-content-center">
                    <h3 className="text-center">Hier kannst du eine neue Kostenart anlegen:</h3>
                </Container>
            </Row>
            <Container className="mt-5">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Immobilie:</Form.Label>
                        <FormControl disabled placeholder={actualRealEstate?.designationOfRealEstate}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                        <Form.Label>Kostenart</Form.Label>
                        <Form.Control placeholder="Trage hier die Kostenart ein"
                                      onChange={onChangeHandlerExpenseCategory}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridDistributionKey">
                        <Form.Label>Umlageschlüssel
                            <OverlayTrigger trigger={['hover', 'click']} overlay={infoContent}>
                                <div><QuestionCircleFill className="question-icon"/></div>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Select defaultValue="Wähle hier einen Umlageschlüssel aus..."
                                     onChange={onChangeHandlerDistributionKey}>
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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Neue Kostenart anlegen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sicher, dass du die Kostenart anlegen möchtest?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose} className="goBackButtonModal">
                        zurück
                    </Button>
                    <Button variant="primary" onClick={addNewExpenseCategory} className="submitButtonModal">ja</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddExpenseCategories;
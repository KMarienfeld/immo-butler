import React, {useEffect, useState} from 'react';
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import {useParams} from "react-router-dom";
import {Button, Col, Container, Form, FormControl, Modal, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {QuestionCircleFill} from "react-bootstrap-icons";
import useFormValuesExpenseCategory from "../hooks/useFormValuesExpenseCategory";
import "./AddExpenseCategories.css";
import useEditRealEstate from "../hooks/useEditRealEstate";
import {RealEstateModel} from "../model/RealEstateModel";

type Props = {
    listOfRealEstates: RealEstateModel[],
    getAllRealEstates: () => void
}
function EditExpenseCategory(props:Props) {
    const {realEstateID, expenseCategoryID} = useParams();
    const {editRealEstate} = useEditRealEstate(props);
    const infoContent = (
        <Tooltip id="tooltip">Da beim Umlageschlüssel 'Direktzuordnung' keine Berechnung benötigt wird, müssen die
            Felder 'Gesamt' und 'Anteil' nicht befüllt werden. </Tooltip>);
    const {
        expenseCategoryN,
        setExpenseCategoryN,
        distributionKeyN,
        setDistributionKeyN,
        totalN,
        setTotalN,
        portionN,
        setPortionN,
        distributionKeyIsCONSUMPTIONBASEDKEY,
        onClickGoBack,
        onChangeHandlerExpenseCategory,
        onChangeHandlerDistributionKey,
        onChangeHandlerTotal,
        onChangeHandlerPortion
    } = useFormValuesExpenseCategory();

    let actualRealEstate: RealEstateModel | undefined;
    let actualExpenseCategory: ExpenseCategoryModel | undefined;

    if (props.listOfRealEstates.length > 0) {
        actualRealEstate = props.listOfRealEstates.find(currentRealEstate => currentRealEstate.id === realEstateID);
        actualExpenseCategory = actualRealEstate?.listOfExpenseCategories.find(currentExpenseCategory => currentExpenseCategory.id === expenseCategoryID);
    }
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleShowEdit();
    }

    useEffect(() => {
        if (expenseCategoryN === "") {
            setExpenseCategoryN(actualExpenseCategory?.expenseCategory ?? "");
        }
        if (distributionKeyN === "") {
            setDistributionKeyN(actualExpenseCategory?.distributionKey ?? "");
        }
        if (totalN === 0) {
            setTotalN(actualExpenseCategory?.total ?? 0);
            }
            if (portionN === 0) {
                setPortionN(actualExpenseCategory?.portion ?? 0);
            }
        }
    )

    function editExpenseCategoryById() {
        if (!expenseCategoryID) {
            return;
        }
        const editedExpenseCategory: ExpenseCategoryModel = {
            id: expenseCategoryID,
            expenseCategory: expenseCategoryN,
            distributionKey: distributionKeyN,
            total: totalN, portion: portionN
        }
        if (!actualRealEstate) {
            return
        }

        const updatedRealEstate: RealEstateModel = {
            ...actualRealEstate,
            listOfExpenseCategories: actualRealEstate?.listOfExpenseCategories.map(currentExpenseCategory => {
                if (currentExpenseCategory.id === expenseCategoryID) {
                    return editedExpenseCategory
                }
                return currentExpenseCategory;
            }) || []
        }

        editRealEstate(actualRealEstate.id, updatedRealEstate)
    }

    function onClickDelete() {
        if (!actualRealEstate) {
            return
        }

        if (!expenseCategoryID) {
            return;
        }


        const updatedRealEstate: RealEstateModel = {
            ...actualRealEstate,
            listOfExpenseCategories: actualRealEstate?.listOfExpenseCategories
                .filter(currentExpenseCategory => currentExpenseCategory.id !== expenseCategoryID)
        }

        editRealEstate(actualRealEstate.id, updatedRealEstate)
    }

    return (
        <div>
            <Row className="mt-5">
                <Container className="d-flex justify-content-center">
                    <h3 className="text-center">Hier kannst du deine Kostenart bearbeiten:</h3>
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
                        <Form.Control placeholder={actualExpenseCategory?.expenseCategory}
                                      onChange={onChangeHandlerExpenseCategory}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridDistributionKey">
                        <Form.Label>Umlageschlüssel
                            <OverlayTrigger trigger={['hover', 'click']} overlay={infoContent}>
                                <div><QuestionCircleFill className="question-icon"/></div>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Select defaultValue={actualExpenseCategory?.distributionKey}
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
                            <Form.Control placeholder={actualExpenseCategory?.total.toString()} onChange={onChangeHandlerTotal} pattern="[0-9]*"
                                          title="Bitte geben Sie nur Zahlen ein" disabled={distributionKeyIsCONSUMPTIONBASEDKEY}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPortion">
                            <Form.Label>Anteil</Form.Label>
                            <Form.Control placeholder={actualExpenseCategory?.portion.toString()} onChange={onChangeHandlerPortion} pattern="[0-9]*"
                                          title="Bitte geben Sie nur ganze Zahlen ein" disabled={distributionKeyIsCONSUMPTIONBASEDKEY}/>
                        </Form.Group>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Button className="buttonDelete" variant="danger" onClick={handleShowDelete}>
                                löschen
                            </Button>
                        </Col>
                        <Col>
                            <Button className="buttonSubmit" type="submit">
                                Kostenart ändern
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
            <Modal
                show={showEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Kostenart ändern</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sicher, dass du die Kostenart ändern möchtest?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleCloseEdit} className="goBackButtonModal">
                        zurück
                    </Button>
                    <Button variant="primary" onClick={editExpenseCategoryById}
                            className="submitButtonModal">ja</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Kostenart löschen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sicher, dass du diese Kostenart löschen möchtest?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleCloseDelete} className="goBackButtonModal">
                        zurück
                    </Button>
                    <Button variant="primary" onClick={onClickDelete}
                            className="submitButtonModal">ja</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditExpenseCategory;
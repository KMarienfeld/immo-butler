import React, {ChangeEvent, useState} from 'react';
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import "./AddUtilityBill.css";
import {HouseAddFill, HouseDash, QuestionCircleFill} from "react-bootstrap-icons";
import {useNavigate} from "react-router-dom";
import {UtilityBillDTOModel} from "../model/UtilityBillDTOModel";
import {CustomExpenseCategoryForBillDTO} from "../model/CustomExpenseCategoryForBillDTO";
import axios from "axios";
import {RealEstateModel} from "../model/RealEstateModel";
import "./Modal.css"

type Props = {
    listOfRealEstates: RealEstateModel[],
    getAllUtilityBills: () => void
}

function AddUtilityBill(props: Props) {
    const navigate = useNavigate();
    const [year, setYear] = useState<number>(0)
    const [prepaymentMonthly, setPrepaymentMonthly] = useState<number>(0);
    const infoContentExpenseCategoryForBillFormCard = (
        <Tooltip id="tooltip">Bei Auswahl einer erstellen Kostenart greift automatisch der dort hinterlegte
            Umlageschlüssel.</Tooltip>);
    const [customExpenseCategoryFormCards, setCustomExpenseCategoryFormCards] = useState([{
        idOfExpenseCategory: "",
        totalBill: 0,
    },]);
    const [selectedRealEstateId, setSelectedRealEstateId] = useState(props.listOfRealEstates.length === 0 ? "" : props.listOfRealEstates[0].id)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleShow();
    }

    function onClickGoBack() {
        navigate("/all-utility-bills")
    }

    function addNewUtilityBill() {
        const newCustomExpenseCategories: CustomExpenseCategoryForBillDTO[] = customExpenseCategoryFormCards.map((formCard, index: number) => {
            const selectedExpenseCategory = props.listOfRealEstates.find(x => x.id === selectedRealEstateId)?.listOfExpenseCategories.find(currentExpenseCategory => currentExpenseCategory.id === formCard.idOfExpenseCategory);
            return {
                expenseCategory: selectedExpenseCategory?.expenseCategory ?? "",
                distributionKey: selectedExpenseCategory?.distributionKey ?? "",
                total: selectedExpenseCategory?.total ?? 0,
                portion: selectedExpenseCategory?.portion ?? 0,
                totalBill: customExpenseCategoryFormCards[index].totalBill,
            }
        })
        const selectedRealEstate: RealEstateModel | undefined = props.listOfRealEstates.find(x => x.id === selectedRealEstateId);
        const newUtilityBillDTO: UtilityBillDTOModel = {
            year: year,
            prepaymentMonthly: prepaymentMonthly,
            customExpenseCategoryDTO: newCustomExpenseCategories,
            designationOfRealEstate: selectedRealEstate?.designationOfRealEstate ?? "",
            genderOfTenant: selectedRealEstate?.genderOfTenant ?? "",
            firstNameOfTenant: selectedRealEstate?.firstNameOfTenant ?? "",
            lastNameOfTenant: selectedRealEstate?.lastNameOfTenant ?? "",
            roadOfRealEstate: selectedRealEstate?.roadOfRealEstate ?? "",
            houseNumberOfRealEstate: selectedRealEstate?.houseNumberOfRealEstate ?? "",
            postCodeOfRealEstate: selectedRealEstate?.postCodeOfRealEstate ?? 0,
            locationOfRealEstate: selectedRealEstate?.locationOfRealEstate ?? "",
            associatedRealEstate: selectedRealEstateId
        }
        let navigateId = "";
        axios.post('/api/utilityBill/add', newUtilityBillDTO)
            .then(response => response.data)
            .then(data => {
                navigateId = data.id;
            })
            .then(props.getAllUtilityBills)
            .catch(error => console.log(error))
            .then(() => navigate("/all-bills/utility-bill/" + navigateId))
    }

    function onChangeHandlerYear(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setYear(Number(value))
    }

    function onChangeHandlerPrepaymentMonthly(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setPrepaymentMonthly(Number(value))
    }

    function onChangeHandlerExpenseCategory(e: ChangeEvent<HTMLSelectElement>, index: number) {
        setCustomExpenseCategoryFormCards(customExpenseCategoryFormCards.map((card, i) => {
            return i === index ? {
                ...card,
                idOfExpenseCategory: e.target.value
            } : card
        }))
        console.log(e.target.value)
    }

    function onChangeHandlerTotalBill(e: ChangeEvent<HTMLInputElement>, index: number) {
        const updatedFormCard = [...customExpenseCategoryFormCards];
        updatedFormCard[index].totalBill = parseFloat(e.target.value);
        setCustomExpenseCategoryFormCards(updatedFormCard)
    }

    const addNewField = () => {
        let newPlainForm = {
            idOfExpenseCategory: "",
            totalBill: 0,
        }
        setCustomExpenseCategoryFormCards([...customExpenseCategoryFormCards, newPlainForm])
    }
    const removeLastField = () => {
        let data = [...customExpenseCategoryFormCards];
        data.splice(data.length - 1, 1)
        setCustomExpenseCategoryFormCards(data)
    }

    return (
        <div>
            <Row className="mt-3">
                <Container className="pt-5 d-flex justify-content-center">
                    <h3 className="text-center">Lege hier eine neue Nebenkostenabrechnung an:</h3>
                </Container>
            </Row>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Container className="mt-5 expenseCategoryForBillFormCard">

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group as={Col} className="mb-3" controlId="formGridSelectExpenseCategory">
                                    <Form.Label>
                                        Immobilie:
                                    </Form.Label>
                                    {props.listOfRealEstates.length > 0 &&
                                    <Form.Select defaultValue="Wähle hier eine Kostenart aus..."
                                                 value={selectedRealEstateId}
                                                 onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedRealEstateId(e.target.value)}>
                                        {props.listOfRealEstates.map(realEstate => (
                                            <option key={realEstate.id} value={realEstate.id}>
                                                {realEstate.designationOfRealEstate}
                                            </option>
                                        ))}
                                    </Form.Select>}
                            </Form.Group>
                        </Col>

                    </Row>
                </Container>
            </div>
            <Container className="mt-5">
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group as={Col} controlId="formGridTotal" className="mb-3">
                            <Form.Label>Jahr der Abrechnung:</Form.Label>
                            <Form.Control className="formControlTotal"
                                          placeholder="Trage hier das Jahr der Abrechnung ein, z.B. 2022"
                                          onChange={onChangeHandlerYear} pattern="[0-9]{4}"
                                          title="Nur ganze Zahlen im Format YYYY eintragen"/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group as={Col} controlId="formGridPortion">
                            <Form.Label>monatliche Vorauszahlung:</Form.Label>
                            <Form.Control className="formControlTotal"
                                          placeholder="geleistete Vorauszahlung pro Monat"
                                          onChange={onChangeHandlerPrepaymentMonthly} pattern="^\d+(\.\d{1,2})?$"
                                          title="Statt dem Komma bitte einen Punkt verwenden, max 2 Nachkommastellen sind möglich"/>
                        </Form.Group>
                    </Col>
                    </Row>
                    {customExpenseCategoryFormCards.map((formCard, index) => (
                        <div key={formCard.idOfExpenseCategory}>
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
                                            {customExpenseCategoryFormCards.length > 0 &&
                                                <Form.Select
                                                    value={customExpenseCategoryFormCards[index].idOfExpenseCategory || ''} // Wenn der Wert null oder undefined ist, wird ein leerer String verwendet
                                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeHandlerExpenseCategory(e, index)}>
                                                    <option disabled value="">
                                                        Wähle hier eine Kostenart aus...
                                                    </option>
                                                    {props.listOfRealEstates.find(x => x.id === selectedRealEstateId)?.listOfExpenseCategories.map(expenseCategory => (
                                                        <option
                                                            key={expenseCategory.id}
                                                            value={expenseCategory.id}
                                                        >
                                                            {expenseCategory.expenseCategory}
                                                        </option>
                                                    ))}
                                                </Form.Select>

                                            }
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group as={Col} controlId="formGridTotalBill">
                                                <div></div>
                                                <Form.Label>Jahresbeitrag:</Form.Label>
                                                <Form.Control placeholder="Trage hier den Jahresbeitrag ein"
                                                              onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandlerTotalBill(e, index)}
                                                              pattern="[0-9]*([.,][0-9]+)?"
                                                              title="Es können nur Zahlen eintragen"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )
                    )}
                    <Row className="mt-3 buttonPlus">
                        <Col>
                            <Button className="buttonNextExpenseCategoryForBillFormCard m-2"
                                    onClick={addNewField} variant="success">
                                <HouseAddFill></HouseAddFill>
                            </Button>

                            <Button className="buttonNextExpenseCategoryForBillFormCard"
                                    onClick={removeLastField} variant="outline-danger">
                                <HouseDash></HouseDash>

                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-5 mb-5">
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
            </Container>
            </Form>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Neue Nebekostenabrechnung erstellen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sicher, dass du eine neue Nebenkostenabrechnung erstellen möchtest?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose} className="goBackButtonModal">
                        zurück
                    </Button>
                    <Button variant="primary" onClick={addNewUtilityBill} className="submitButtonModal">ja</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddUtilityBill;
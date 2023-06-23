import React, {FormEvent, useEffect} from 'react';
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {QuestionCircleFill} from "react-bootstrap-icons";
import {ExpenseCategoryDTOModel} from "../model/ExpenseCategoryDTOModel";
import axios from "axios";
import useFormValuesExpenseCategory from "../hooks/useFormValuesExpenseCategory";
import "./AddExpenseCategories.css";


type Props = {
    listOfExpenseCategories:ExpenseCategoryModel[],
    getAllExpenseCategories: () => void
}
function EditExpenseCategory(props:Props) {
    const params = useParams();
    const navigate = useNavigate();
    const id:string|undefined = params.id
    const infoContent = (<Tooltip id="tooltip">Da beim Umlageschlüssel 'Direktzuordnung' keine Berechnung benötigt wird, müssen die Felder 'Gesamt' und 'Anteil' nicht befüllt werden. </Tooltip>);
    const {expenseCategoryN, setExpenseCategoryN, distributionKeyN, setDistributionKeyN, totalN, setTotalN, portionN, setPortionN, distributionKeyIsCONSUMPTIONBASEDKEY,
        onClickGoBack,onChangeHandlerExpenseCategory,onChangeHandlerDistributionKey, onChangeHandlerTotal, onChangeHandlerPortion} = useFormValuesExpenseCategory();

    let actualExpenseCategory: ExpenseCategoryModel| undefined = undefined;

    if (props.listOfExpenseCategories.length > 0) {
         actualExpenseCategory = props.listOfExpenseCategories.find(currentExpenseCategory => currentExpenseCategory.id === id);
    }

    useEffect( () => {
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

    function editExpenseCategoryById(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const editedExpenseCategoryDTO: ExpenseCategoryDTOModel = {
            expenseCategory: expenseCategoryN,
            distributionKey:distributionKeyN,
            total:totalN, portion:portionN
        }
        axios.put("/api/expenseCategory/edit/" + id, editedExpenseCategoryDTO)
            .then(r => {
                console.log(r.data)
            })
            .then(props.getAllExpenseCategories)
            .then(() => navigate("/all-expense-categories"))
            .catch(error => console.log(error))
    }

    function onClickDelete() {
        axios.delete("/api/expenseCategory/delete/" + id)
            .then(r => {
                console.log(r.data)
            })
            .then(props.getAllExpenseCategories)
            .then(()=> navigate("/all-expense-categories"))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <Row className="mt-5">
                <Container className="d-flex justify-content-center">
                    <h3 className="text-center">Hier kannst du deine Kostenart bearbeiten:</h3>
                </Container>
            </Row>
            <Container className="mt-5">
                <Form onSubmit={editExpenseCategoryById}>
                    <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                        <Form.Label>Kostenart</Form.Label>
                        <Form.Control placeholder={actualExpenseCategory?.expenseCategory} onChange={onChangeHandlerExpenseCategory}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridDistributionKey">
                        <Form.Label>Umlageschlüssel
                            <OverlayTrigger trigger={['hover', 'click']} overlay={infoContent}><div><QuestionCircleFill className="question-icon"/></div></OverlayTrigger>
                        </Form.Label>
                        <Form.Select defaultValue={actualExpenseCategory?.distributionKey} onChange={onChangeHandlerDistributionKey}>
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
                            <Button className="buttonDelete" variant="danger" onClick={onClickDelete}>
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
                        <Button className="buttonBack" variant="outline-dark" onClick={onClickGoBack} >zurück</Button>
                    </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default EditExpenseCategory;
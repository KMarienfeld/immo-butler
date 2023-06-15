import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./AddExpenseCategories.css"
import {useNavigate} from "react-router-dom";
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import axios from "axios";

function AddExpenseCategories() {

    const navigate = useNavigate();
    const [expanseCategoryN, setExpanseCategoryN] = useState<string>("")
    const [distributionKeyN, setDistributionKeyN] = useState<string>("")
    const [totalN, setTotalN] = useState<number>(0)
    const [portionN, setPortionN] = useState<number>(0)

    function onClickGoBack() {
        navigate("/all-expense-categories")
    }

    function onChangeHandlerExpenseCategory(e:ChangeEvent<HTMLInputElement>) {
        setExpanseCategoryN(e.target.value)
    }

    function onChangeHandlerDistributionKey(e:ChangeEvent<HTMLSelectElement>) {
        setDistributionKeyN(e.target.value)
    }

    function onChangeHandlerTotal(e:ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setTotalN(Number(value))
    }

    function onChangeHandlerPortion(e:ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setPortionN(Number(value))
    }

    function addNewExpenseCategory(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newExpenseCategory:ExpenseCategoryModel = {
            expanseCategory:expanseCategoryN,
            distributionKey:distributionKeyN,
            total:totalN, portion:portionN
        }
       axios.post('api/expenseCategory/add', newExpenseCategory)
           .then(response => {
               console.log(response.data)
           })
           .then(()=> navigate("/all-expense-categories"))
           .catch(error => console.log(error))
    }

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
                        <Form.Label>Umlageschlüssel</Form.Label>
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
                                          title="Bitte geben Sie nur Zahlen ein"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPortion">
                            <Form.Label>Anteil</Form.Label>
                            <Form.Control placeholder="Wohneinheitsanteil" onChange={onChangeHandlerPortion} pattern="[0-9]*"
                                          title="Bitte geben Sie nur ganze Zahlen ein" />
                        </Form.Group>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Button className="buttonBack" variant="outline-dark" type="submit" onClick={onClickGoBack}>
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
import React, {useEffect} from 'react';
import {ExpenseCategoryModel} from "../model/ExpenseCategoryModel";
import {useParams} from "react-router-dom";
import {Button, Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {QuestionCircleFill} from "react-bootstrap-icons";
import useAddingExpenseCategory from "../hooks/useFormValuesExpenseCategory";

type Props = {
    expenseCategories: ExpenseCategoryModel[]
}
function EditExpenseCategory(props:Props) {

    const params = useParams();
    const id:string|undefined = params.id
    const actualExpenseCategory: ExpenseCategoryModel| undefined = props.expenseCategories.find(currentExpenseCategory => currentExpenseCategory.id === id);
    const infoContent = (<Tooltip id="tooltip">Da beim Umlageschlüssel 'Direktzuordnung' keine Berechnung benötigt wird, müssen die Felder 'Gesamt' und 'Anteil' nicht befüllt werden. </Tooltip>);
    const {distributionKeyIsCONSUMPTIONBASEDKEY, onClickGoBack,onChangeHandlerExpenseCategory,onChangeHandlerDistributionKey, onChangeHandlerTotal, onChangeHandlerPortion, editExpenseCategoryById} = useAddingExpenseCategory();

    return (
        <div>
            <Row className="mt-5">
                <Container className="d-flex justify-content-center">
                    <h3 className="text-center">Hier kannst du deine Kostenstelle bearbeiten:</h3>
                </Container>
            </Row>
            <Container className="mt-5">
                <Form onSubmit={editExpenseCategoryById}>
                    <Form.Group className="mb-3" controlId="formGridExpenseCategory">
                        <Form.Label>Kostenart</Form.Label>
                        <Form.Control placeholder={actualExpenseCategory?.expanseCategory} onChange={onChangeHandlerExpenseCategory}/>
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

export default EditExpenseCategory;
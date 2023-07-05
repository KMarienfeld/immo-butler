import React from 'react';
import ExpenseCategoryCard from "./ExpenseCategoryCard";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./ExpenseCategoryCard.css"
import {RealEstateModel} from "../model/RealEstateModel";

type Props = {
    actualRealEstate: RealEstateModel | undefined
}
function ExpenseCategoriesGallery(props:Props) {

    const navigate = useNavigate();

    function buttonNewExpenseCategory() {
        navigate("/all-real-estates/real-estate/expense-category/add/" + props.actualRealEstate?.id)
    }
const realEstateId = props.actualRealEstate?.id
    return (
        <div>
            {props.actualRealEstate?.listOfExpenseCategories.length === 0 ?
                <div>
                    <Container className="pt-5 pb-5 d-flex justify-content-center">
                        <h4 className="text-center">
                            du hast bisher noch nichts angelegt, starte direkt mit deiner ersten Kostenart!
                        </h4>
                    </Container>
                    <Container className="d-flex justify-content-center mt-5">
                        <Button className="buttonNewExpenseCategory" onClick={buttonNewExpenseCategory}>
                            neue Kostenart anlegen
                        </Button>
                    </Container>
                </div> :
                <div>
                    <Container className="pt-2 d-flex justify-content-center">
                        <h3 className="text-center">
                            Hier siehst du alle deine angelegten Kostenarten
                        </h3>
                    </Container>
                    <Container className="mt-4 mb-4">
                        {realEstateId &&
                            <Row>
                                {props.actualRealEstate?.listOfExpenseCategories.map(currentExpenseCategory => (
                                    <Col md={4} key={currentExpenseCategory.id}>
                                        <ExpenseCategoryCard expenseCategory={currentExpenseCategory}
                                                             realEstateID={realEstateId}/>
                                    </Col>
                                ))}
                            </Row>
                        }
                    </Container>
                    <Container className="d-flex pb-5 justify-content-center mt-5">
                        <Button className="buttonNewExpenseCategory" onClick={buttonNewExpenseCategory}>
                            neue Kostenart anlegen
                        </Button>
                    </Container>
                </div>
            }
        </div>
    );
}

export default ExpenseCategoriesGallery;
import React from 'react';
import {Accordion, Button, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {RealEstateModel} from "../model/RealEstateModel";
import "./AllRealEstates.css"

type Props = {
    listOfRealEstates: RealEstateModel[],
}

function AllRealEstates(props: Props) {
    const navigate = useNavigate();

    function buttonNewRealEstate() {
        navigate("/add-real-estates")
    }

    function getGenderOfTenantInApp(genderOfTenant: string) {
        switch (genderOfTenant) {
            case "MALE":
                return "Herr";
            case "Female":
                return "Frau";
        }
    }

    return (
        <div className="pageContent">
            {props.listOfRealEstates.length === 0 ?
                <div>
                    <Container>
                        <Row className="pt-5 d-flex justify-content-center">
                            <h4 className="text-center">
                                Bisher wurde noch keine Immobilie angelegt, starte jetzt mit deiner ersten Immobilie!
                            </h4>
                        </Row>
                    </Container>
                    <Container className="d-flex pb-5 justify-content-center mt-5">
                        <Button className="buttonNewExpenseCategory" onClick={buttonNewRealEstate}>
                            erste Immobilie anlegen
                        </Button>
                    </Container>
                </div>
                :
                <div>
                    <Container className="d-flex justify-content-center pt-5 mb-3">
                        <h3>Hier siehst du alle deine Immobilien: </h3>
                    </Container>
                    {props.listOfRealEstates.map((currentRealEstate, index) => (
                        <Container key={currentRealEstate.id} className=" mb-3">
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey={index.toString()}>
                                    <Accordion.Header
                                        className="customHeader">#{index + 1} {currentRealEstate.designationOfRealEstate}</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Anschrift: {currentRealEstate.roadOfRealEstate} {currentRealEstate.houseNumberOfRealEstate} , {currentRealEstate.postCodeOfRealEstate} {currentRealEstate.locationOfRealEstate}</p>
                                        <p>Mieter: {getGenderOfTenantInApp(currentRealEstate.genderOfTenant)} {currentRealEstate.firstNameOfTenant} {currentRealEstate.lastNameOfTenant}</p>
                                        <Button variant="outline-secondary">Immobilie bearbeiten</Button>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Container>
                    ))}
                    <Container className="d-flex pb-5 justify-content-center mt-5">
                        <Button className="buttonNewExpenseCategory" onClick={buttonNewRealEstate}>
                            neue Immobilie anlegen
                        </Button>
                    </Container>
                </div>
            }
        </div>
    );
}

export default AllRealEstates;
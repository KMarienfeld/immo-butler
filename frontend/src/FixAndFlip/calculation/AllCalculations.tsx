import {Accordion, Button, Container, Nav} from "react-bootstrap";
import React, {useState} from "react";
import {CalculationApartmentModel} from "../model/CalculationApartmentModel";
import {CalculationHouseModel} from "../model/CalculationHouseModel";

type Props = {
    listOfAllApartmentCalculations: CalculationApartmentModel[],
    listOfAllHouseCalculations: CalculationHouseModel[]
}

function AllCalculations(props: Props) {
    const [activeTab, setActiveTab] = useState("calculationApartment");
    const handleTabSelect = (selectedTab: string | null) => {
        if (selectedTab) {
            setActiveTab(selectedTab);
        }
    };
    return (
        <div>
            <Container className="pt-5">
                <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect} className="mb-5">
                    <Nav.Item>
                        <Nav.Link className="custom-nav-link" eventKey="calculationApartment">Kalkulation für Wohnungen</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="custom-nav-link" eventKey="calculationHouse">Kalkulation für Häuser</Nav.Link>
                    </Nav.Item>
                </Nav>
                {activeTab === "calculationApartment" && <>
                {props.listOfAllApartmentCalculations
                    .map((calculationApartment, index) => (
                        <div>
                            <Container key={calculationApartment.id} className=" mb-3">
                                <Accordion defaultActiveKey="0" className="expenseCategoryCard" flush>
                                    <Accordion.Item eventKey={index.toString()}>
                                        <Accordion.Header
                                            className="customHeader">#{index + 1} {calculationApartment.name}</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Anschrift: </p>
                                            <Button variant="outline-secondary" className="m-3"
                                                    >
                                                Button</Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Container>
                        </div>
                    ))
                }
                </>}
                {activeTab === "calculationHouse" && <>
                {props.listOfAllHouseCalculations
                    .map((calculationHouse, index) => (
                        <div>
                            <Container key={calculationHouse.id} className=" mb-3">
                                <Accordion defaultActiveKey="0" className="expenseCategoryCard" flush>
                                    <Accordion.Item eventKey={index.toString()}>
                                        <Accordion.Header
                                            className="customHeader">#{index + 1} {calculationHouse.name}</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Anschrift: </p>
                                            <Button variant="outline-secondary" className="m-3"
                                                    >
                                                Button</Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Container>
                        </div>
                    ))}
                </>}


            </Container>
        </div>
    )
}
export default AllCalculations;
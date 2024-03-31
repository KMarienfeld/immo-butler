import {Container, Nav} from "react-bootstrap";
import React, {useState} from "react";

type Props = {

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

               {/* {activeTab === "calculationApartment" && </>}
                {activeTab === "calculationHouse" &&
                    </>}*/}


            </Container>
        </div>
    )
}
export default AllCalculations;
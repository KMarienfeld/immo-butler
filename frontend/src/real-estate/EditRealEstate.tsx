import React, {useState} from 'react';
import {RealEstateModel} from "../model/RealEstateModel";
import {Container, Nav} from "react-bootstrap";
import {useParams} from "react-router-dom";
import EditGeneralRealEstate from "./EditGeneralRealEstate";
import ExpenseCategoriesGallery from "../expense-categories/ExpenseCategoriesGallery";
import "./EditRealEstate.css";

type Props = {
    listOfRealEstates: RealEstateModel[]
    getAllRealEstates: () => void
}

function EditRealEstate(props: Props) {
    const [activeTab, setActiveTab] = useState("generalRealEstate");
    const handleTabSelect = (selectedTab: string | null) => {
        if (selectedTab) {
            setActiveTab(selectedTab);
        }
    };
    const params = useParams();
    const id: string | undefined = params.id;
    let actualRealEstate: RealEstateModel | undefined;

    if (props.listOfRealEstates.length > 0) {
        actualRealEstate = props.listOfRealEstates.find(currentRealEstate => currentRealEstate.id === id);
    }

    return (
        <div>
            <Container className="pt-5 test">
                <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect} className="mb-5">
                    <Nav.Item>
                        <Nav.Link className="custom-nav-link" eventKey="generalRealEstate">Allgemeines</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="custom-nav-link" eventKey="expenseRealEstate">Kostenarten</Nav.Link>
                    </Nav.Item>
                </Nav>

                {activeTab === "generalRealEstate" && <EditGeneralRealEstate actualRealEstate={actualRealEstate}
                                                                             getAllRealEstates={props.getAllRealEstates}/>}
                {activeTab === "expenseRealEstate" &&
                    <ExpenseCategoriesGallery actualRealEstate={actualRealEstate}/>}


            </Container>

        </div>
    );
}

export default EditRealEstate;
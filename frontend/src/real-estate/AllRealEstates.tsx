import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function AllRealEstates() {
    const navigate = useNavigate();

    function buttonNewRealEstate() {
        navigate("/add-real-estates")
    }

    return (
        <div>
            <Button className="buttonNewExpenseCategory" onClick={buttonNewRealEstate}>
                neue Immobilie anlegen
            </Button>
        </div>
    );
}

export default AllRealEstates;
import {useState} from "react";
import {RealEstateModel} from "../model/RealEstateModel";
import axios from "axios";

function UseGetAllRealEstates() {
    const [listOfRealEstates, setListOfRealEstates] = useState<RealEstateModel[]>([]);

    function getAllRealEstates() {
        axios.get("/api/realEstate/get-all")
            .then(r => r.data)
            .then(data => {
                setListOfRealEstates(data);
                console.log(data)
            })
            .catch(error => console.log(error))
    }

    return {listOfRealEstates, getAllRealEstates}
}

export default UseGetAllRealEstates;
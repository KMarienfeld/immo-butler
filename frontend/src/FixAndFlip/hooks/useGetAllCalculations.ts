import {useState} from "react";
import {CalculationApartmentModel} from "../model/CalculationApartmentModel";
import axios from "axios";

function useGetAllCalculations() {
    const [listOfCalculations, setListOfCalculations] = useState<CalculationApartmentModel[]>([]);

    function getAllCalculations() {
        axios.get("/api/fixFlip/calculation/getAll")
            .then(r => r.data)
            .then(data => {
                setListOfCalculations(data)
            })
            .catch(error => console.log(error))
            .then()
    }
    return {listOfCalculations, getAllCalculations}
}

export default useGetAllCalculations;
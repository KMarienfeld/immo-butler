import {useState} from "react";
import {CalculationApartmentModel} from "../model/CalculationApartmentModel";
import axios from "axios";
import {CalculationHouseModel} from "../model/CalculationHouseModel";

function useGetAllCalculations() {
    const [listOfApartmentCalculation, setListOfApartmentCalculation] = useState<CalculationApartmentModel[]>([]);
    const [listOfHouseCalculation, setListOfHouseCalculation] = useState<CalculationHouseModel[]>([]);
    function getAllApartmentCalculations() {
        axios.get("/api/fixFlip/calculation/apartment/getAll")
            .then(r => r.data)
            .then(data => {
                setListOfApartmentCalculation(data)
            })
            .catch(error => console.log(error))
            .then()
    }

    function getAllHouseCalculations() {
        axios.get("/api/fixFlip/calculation/house/getAll")
            .then(r => r.data)
            .then(data => {
                setListOfHouseCalculation(data)
            })
            .catch(error => console.log(error))
            .then()
    }
    return {listOfApartmentCalculation, getAllApartmentCalculations, listOfHouseCalculation, getAllHouseCalculations}
}

export default useGetAllCalculations;
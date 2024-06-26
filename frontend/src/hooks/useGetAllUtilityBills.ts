import {useState} from 'react';
import {UtilityBillModel} from "../model/UtilityBillModel";
import axios from "axios";

function useGetAllUtilityBills() {
    const [listOfUtilityBills, setListOfUtilityBills] = useState<UtilityBillModel[]>([]);

    function getAllUtilityBills() {
        axios.get("/api/utilityBill/get-all")
            .then(r => r.data)
            .then(data => {
                setListOfUtilityBills(data)
            })
            .catch(error => console.log(error))
            .then()
    }

    return {listOfUtilityBills, getAllUtilityBills}

}

export default useGetAllUtilityBills;
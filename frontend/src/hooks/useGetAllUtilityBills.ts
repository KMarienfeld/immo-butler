import {useState} from 'react';
import {UtilityBillModel} from "../model/UtilityBillModel";
import axios from "axios";

function UseGetAllUtilityBills() {
    const [listOfUtilityBills, setListOfUtilityBills] = useState<UtilityBillModel[]>([]);

    function getAllUtilityBills() {
        axios.get("api/utilityBill/add")
            .then(r => r.data)
            .then(data => {
                setListOfUtilityBills(data)
                console.log(data)
            })
            .catch(error => console.log(error))
            .then()
    }

    return {listOfUtilityBills, getAllUtilityBills}

}

export default UseGetAllUtilityBills;
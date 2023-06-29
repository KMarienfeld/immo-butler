import axios from "axios";
import {useNavigate} from "react-router-dom";


function UseDeleteUtilityBill() {
    const navigate = useNavigate();

    function deleteUtilityBill(id: string) {
        axios.delete("api/utilityBill/delete/" + id)
            .then(r => r.data)
            .then(() => navigate("/all-bills"))
            .catch(error => console.log(error))
    }

    return {deleteUtilityBill};
}

export default UseDeleteUtilityBill;
import axios from "axios";
import {useNavigate} from "react-router-dom";

type Props = {
    getAllUtilityBills: () => void
}

function useDeleteUtilityBill(props: Props) {
    const navigate = useNavigate();

    function deleteUtilityBill(idOfUtilityBill: string, idOfAssociateRealEstate: string) {
        axios.delete("/api/utilityBill/delete/" + idOfUtilityBill + "/" + idOfAssociateRealEstate)
            .then(r => r.data)
            .then(props.getAllUtilityBills)
            .then(() => navigate("/all-utility-bills"))
            .catch(error => console.log(error))
    }

    return {deleteUtilityBill};
}

export default useDeleteUtilityBill;
import axios from "axios";
import {useNavigate} from "react-router-dom";

type Props = {
    getAllUtilityBills: () => void
}

function useDeleteUtilityBill(props: Props) {
    const navigate = useNavigate();

    function deleteUtilityBill(id: string) {
        axios.delete("/api/utilityBill/delete/" + id)
            .then(r => r.data)
            .then(props.getAllUtilityBills)
            .then(() => navigate("/all-bills"))
            .catch(error => console.log(error))
    }

    return {deleteUtilityBill};
}

export default useDeleteUtilityBill;
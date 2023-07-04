import {useNavigate} from "react-router-dom";
import {RealEstateDto} from "../model/RealEstateDTO";
import axios from "axios";

type Props = {
    getAllRealEstates: () => void
}

function useEditRealEstate(props: Props) {
    const navigate = useNavigate();

    function editRealEstate(id: string, editedRealEstateDto: RealEstateDto) {
        axios.put("/api/realEstate/edit/" + id, editedRealEstateDto)
            .then(r => {
                console.log(r.data)
            })
            .then(props.getAllRealEstates)
            .then(() => navigate("/all-real-estates"))
            .catch(error => console.log(error))
    }

    return {editRealEstate}
}

export default useEditRealEstate;
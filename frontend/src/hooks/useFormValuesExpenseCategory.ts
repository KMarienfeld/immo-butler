import {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";

export default function useFormValuesExpenseCategory() {
    const navigate = useNavigate();
    const [expenseCategoryN, setExpenseCategoryN] = useState<string>("")
    const [distributionKeyN, setDistributionKeyN] = useState<string>("")
    const [totalN, setTotalN] = useState<number>(1)
    const [portionN, setPortionN] = useState<number>(1)
    const [distributionKeyIsCONSUMPTIONBASEDKEY, setDistributionKeyIsCONSUMPTIONBASEDKEY] = useState<boolean>(false)

    function onClickGoBack() {
        navigate("/all-expense-categories")
    }

    function onChangeHandlerExpenseCategory(e: ChangeEvent<HTMLInputElement>) {
        setExpenseCategoryN(e.target.value)
    }

    function onChangeHandlerDistributionKey(e:ChangeEvent<HTMLSelectElement>) {
        const selectedValue = e.target.value;
        setDistributionKeyN(selectedValue);
        setDistributionKeyIsCONSUMPTIONBASEDKEY(selectedValue === "CONSUMPTIONBASEDKEY");
    }

    function onChangeHandlerTotal(e:ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setTotalN(Number(value))
    }

    function onChangeHandlerPortion(e:ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setPortionN(Number(value))
    }

    return{expenseCategoryN, setExpenseCategoryN, distributionKeyN, setDistributionKeyN, totalN, setTotalN, portionN, setPortionN, distributionKeyIsCONSUMPTIONBASEDKEY, setDistributionKeyIsCONSUMPTIONBASEDKEY,
        onClickGoBack,onChangeHandlerExpenseCategory,onChangeHandlerDistributionKey, onChangeHandlerTotal, onChangeHandlerPortion }
}


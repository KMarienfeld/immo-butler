import {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";

export default function useFormValuesRealEstate() {
    const [designationOfRealEstateN, setDesignationOfRealEstateN] = useState<string>("");
    const [roadOfRealEstateN, setRoadOfRealEstateN] = useState<string>("");
    const [houseNumberOfRealEstateN, setHouseNumberOfRealEstateN] = useState<string>("");
    const [postCodeOfRealEstateN, setPostCodeOfRealEstateN] = useState<number>(0);
    const [locationOfRealEstateN, setLocationOfRealEstateN] = useState<string>("");
    const [genderOfTenantN, setGenderOfTenantN] = useState<string>("");
    const [firstNameOfTenantN, setFirstNameOfTenantN] = useState<string>("");
    const [lastNameOfTenantN, setLastNameOfTenantN] = useState<string>("");
    const navigate = useNavigate();

    function onChangeHandlerDesignationOfRealEstate(e: ChangeEvent<HTMLInputElement>) {
        setDesignationOfRealEstateN(e.target.value)
    }

    function onChangeHandlerRoadOfRealEstate(e: ChangeEvent<HTMLInputElement>) {
        setRoadOfRealEstateN(e.target.value)
    }

    function onChangeHandlerHouseNumberOfRealEstate(e: ChangeEvent<HTMLInputElement>) {
        setHouseNumberOfRealEstateN(e.target.value)
    }

    function onChangeHandlerPostCodeOfRealEstate(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setPostCodeOfRealEstateN(Number(value))
    }

    function onChangeHandlerLocationOfRealEstate(e: ChangeEvent<HTMLInputElement>) {
        setLocationOfRealEstateN(e.target.value)
    }

    function onChangeHandlerGenderOfTenant(e: ChangeEvent<HTMLSelectElement>) {
        setGenderOfTenantN(e.target.value)
    }

    function onChangeHandlerFirstNameOfTenant(e: ChangeEvent<HTMLInputElement>) {
        setFirstNameOfTenantN(e.target.value)
    }

    function onChangeHandlerLastNameOfTenant(e: ChangeEvent<HTMLInputElement>) {
        setLastNameOfTenantN(e.target.value)
    }

    function onClickGoBack() {
        navigate("/all-real-estates")
    }

    return {
        onChangeHandlerDesignationOfRealEstate,
        designationOfRealEstateN,
        onChangeHandlerRoadOfRealEstate,
        roadOfRealEstateN,
        onChangeHandlerHouseNumberOfRealEstate,
        houseNumberOfRealEstateN,
        onChangeHandlerPostCodeOfRealEstate,
        postCodeOfRealEstateN,
        onChangeHandlerLocationOfRealEstate,
        locationOfRealEstateN,
        onChangeHandlerGenderOfTenant,
        genderOfTenantN,
        onChangeHandlerFirstNameOfTenant,
        firstNameOfTenantN,
        onChangeHandlerLastNameOfTenant,
        lastNameOfTenantN,
        onClickGoBack
    }

}


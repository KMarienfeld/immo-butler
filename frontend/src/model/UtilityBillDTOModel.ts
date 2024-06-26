import {CustomExpenseCategoryForBillDTO} from "./CustomExpenseCategoryForBillDTO";

export type UtilityBillDTOModel = {
    year: number,
    prepaymentMonthly: number,
    customExpenseCategoryDTO: CustomExpenseCategoryForBillDTO[];
    designationOfRealEstate: string,
    genderOfTenant: string,
    firstNameOfTenant: string,
    lastNameOfTenant: string,
    roadOfRealEstate: string,
    houseNumberOfRealEstate: string,
    postCodeOfRealEstate: number,
    locationOfRealEstate: string,
    associatedRealEstate: string
}
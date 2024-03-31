import {ExpenseCategoryModel} from "./ExpenseCategoryModel";

export type RealEstateDto = {
    designationOfRealEstate: string,
    roadOfRealEstate: string,
    houseNumberOfRealEstate: string,
    postCodeOfRealEstate: number,
    locationOfRealEstate: string,
    genderOfTenant: string,
    firstNameOfTenant: string,
    lastNameOfTenant: string,
    listOfExpenseCategories: ExpenseCategoryModel[],
    utilityBills: String[]
}
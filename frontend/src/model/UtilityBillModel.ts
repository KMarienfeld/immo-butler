import {CustomExpenseCategoryForBillModel} from "./CustomExpenseCategoryForBillModel"

export type UtilityBillModel = {
    id: string,
    year: number,
    prepaymentMonthly: number,
    prepaymentYear: number,
    totalCostsOfAllExpenseCategories: number;
    finalResult: number,
    customExpenseCategoryModel: CustomExpenseCategoryForBillModel[];
    designationOfRealEstate: string,
    genderOfTenant: string,
    firstNameOfTenant: string,
    lastNameOfTenant: string,
    roadOfRealEstate: string,
    houseNumberOfRealEstate: string,
    postCodeOfRealEstate: number,
    locationOfRealEstate: string
}

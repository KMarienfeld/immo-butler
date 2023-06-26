import {CustomExpenseCategoryForBillModel} from "./CustomExpenseCategoryForBillModel"

export type UtilityBillModel = {
    id: string,
    year: number,
    proportionalCosts: number,
    totalCosts: number,
    prepaymentMonthly: number,
    prepaymentYear: number,
    finalResult: number,
    customExpenseCategoryModel: CustomExpenseCategoryForBillModel[];
}

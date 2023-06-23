import {CustomExpenseCategoryForBillDTO} from "./CustomExpenseCategoryForBillDTO";

export type UtilityBillModel = {
    id: string,
    year: number,
    proportionalCosts: number,
    totalCosts: number,
    prepaymentMonthly: number,
    prepaymentYear: number,
    customExpenseCategoryDTO: CustomExpenseCategoryForBillDTO[];
}

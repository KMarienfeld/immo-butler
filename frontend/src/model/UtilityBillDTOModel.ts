import {CustomExpenseCategoryForBillDTO} from "./CustomExpenseCategoryForBillDTO";

export type UtilityBillDTOModel = {
    year: number,
    prepaymentMonthly: number,
    customExpenseCategoryDTO: CustomExpenseCategoryForBillDTO[];
}
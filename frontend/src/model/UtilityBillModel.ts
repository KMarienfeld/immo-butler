import {CustomExpenseCategoryForBillModel} from "./CustomExpenseCategoryForBillModel"

export type UtilityBillModel = {
    id: string,
    year: number,
    prepaymentMonthly: number,
    prepaymentYear: number,
    totalCostsOfAllExpenseCategories: number;
    finalResult: number,
    customExpenseCategoryModel: CustomExpenseCategoryForBillModel[];
}

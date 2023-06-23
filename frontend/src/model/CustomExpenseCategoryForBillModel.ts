export type CustomExpenseCategoryForBillDTO = {
    id: string,
    expenseCategory: string,
    distributionKey: string,
    total: number,
    portion: number,
    totalBill: number,
    proportionalBill: number;
}
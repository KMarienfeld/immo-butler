export enum TypeOfCalculation {
    APARTMENT = "apartment",
    HOUSE = "house"
}

export type CalculationApartmentModel = {
    id: string,
    name: string,
    address: string,
    livingSpace: number,
    additionalCosts: number,
    reserves: number,
    constructionYear: number,
    residentialUnits: number,
    renovationCosts: number,
    interestCosts: number,
    otherCosts: number,
    houseMoney: number,
    type: TypeOfCalculation
}
import React from 'react';
import {Table} from "react-bootstrap";
import {UtilityBillModel} from "../model/UtilityBillModel";
import {useParams} from "react-router-dom";
import {CustomExpenseCategoryForBillModel} from "../model/CustomExpenseCategoryForBillModel";

type Props = {
    listOfUtilityBills: UtilityBillModel[],
}

function DetailOfUtilityBill(props: Props) {
    const params = useParams();
    const id: string | undefined = params.id;

    let actualUtilityBill: UtilityBillModel | undefined;
    let listOfActualCustomExpenseCategories: CustomExpenseCategoryForBillModel[] | undefined;
    if (props.listOfUtilityBills.length > 0) {
        actualUtilityBill = props.listOfUtilityBills.find(currentUtilityBill => currentUtilityBill.id === id);
        listOfActualCustomExpenseCategories = actualUtilityBill?.customExpenseCategoryModel;
    }

    return (
        <div>
            <h1>Nebenkostenabrechnung {actualUtilityBill?.year}</h1>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Kostenart</th>
                    <th>Gesamtkosten</th>
                    <th>anteilige Kosten</th>
                </tr>
                </thead>
                <tbody>
                {listOfActualCustomExpenseCategories?.map((currentCustomExpenseCategory, index) => (
                    <tr>
                        <td key={currentCustomExpenseCategory.id}>{index + 1}</td>
                        <td>{currentCustomExpenseCategory.expenseCategory}</td>
                        <td>{currentCustomExpenseCategory.totalBill}</td>
                        <td>{currentCustomExpenseCategory.proportionalBill}</td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={3}>Gesamtbetrag: {actualUtilityBill?.totalCostsOfAllExpenseCategories}</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
            <p>Die geleistete Vorauszahlung pro Monat betrug: {actualUtilityBill?.prepaymentMonthly},<br/>
                das entspricht einer Jahreszahlung von {actualUtilityBill?.prepaymentYear}.</p>
            <p>
                Daraus ergibt sich eine{' '}
                {actualUtilityBill?.finalResult !== undefined
                    ? (actualUtilityBill?.finalResult < 0 ? (
                            <>Rückerstattung in Höhe von {actualUtilityBill?.finalResult}</>
                        ) : (
                            <>Nachzahlung in Höhe von {actualUtilityBill?.finalResult}</>
                        )
                    ) : (
                        ''
                    )}
            </p>
            );


        </div>
    );
}

export default DetailOfUtilityBill;
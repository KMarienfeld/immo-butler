import React from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {UtilityBillModel} from "../model/UtilityBillModel";
import {useNavigate, useParams} from "react-router-dom";
import {CustomExpenseCategoryForBillModel} from "../model/CustomExpenseCategoryForBillModel";
import useDeleteUtilityBill from "../hooks/useDeleteUtilityBill";
import axios from "axios";

type Props = {
    listOfUtilityBills: UtilityBillModel[],
    getAllUtilityBills: () => void
}

function DetailOfUtilityBill(props: Props) {
    const params = useParams();
    const id: string | undefined = params.id;
    const navigate = useNavigate();
    const {deleteUtilityBill} = useDeleteUtilityBill(props);

    let actualUtilityBill: UtilityBillModel | undefined;
    let listOfActualCustomExpenseCategories: CustomExpenseCategoryForBillModel[] | undefined;
    if (props.listOfUtilityBills.length > 0) {
        actualUtilityBill = props.listOfUtilityBills.find(currentUtilityBill => currentUtilityBill.id === id);
        listOfActualCustomExpenseCategories = actualUtilityBill?.customExpenseCategoryModel;
    }

    function onClickGoBackToGetAll() {
        navigate("/all-bills")
    }

    function onClickDeleteButton(id: string | undefined) {
        if (id !== undefined) {
            deleteUtilityBill(id)
        }
    }

    function onClickPdfExport(id: string | undefined) {
        if (id !== undefined) {
            const generatePdf = async () => {
                const response = await axios.get("/api/utilityBill/getPDF/" + id, {
                    responseType: 'arraybuffer',
                });
                const blob = new Blob([response.data], {type: "application/pdf"});
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "export-utility-bill.pdf"
                link.click();
                window.URL.revokeObjectURL(url);
            };
            generatePdf().then(r => {
                console.log("PDF generated successfully ", r)
            }).catch(error => {
                console.log("PDF generation failed ", error)
            });
        }
    }

    return (
        <div className="pageContent">
            <Container className="pt-5 d-flex justify-content-center">
                <h1>Nebenkostenabrechnung {actualUtilityBill?.year}</h1>
            </Container>
            <Container className="mt-5 mb-5">
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
                        <tr key={currentCustomExpenseCategory.id}>
                            <td>{index + 1}</td>
                            <td>{currentCustomExpenseCategory.expenseCategory}</td>
                            <td>{currentCustomExpenseCategory.totalBill}</td>
                            <td>{currentCustomExpenseCategory.proportionalBill}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3}><strong>Gesamtbetrag: </strong></td>
                        <td><strong>{actualUtilityBill?.totalCostsOfAllExpenseCategories}</strong></td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
            <Container className="d-flex justify-content-center">
                <Row>
                    <Col>Die geleistete Vorauszahlung pro Monat betrug <br
                        className="d-sm-none"/>{actualUtilityBill?.prepaymentMonthly}€, <br className="d-sm-none"/>
                        das entspricht einer Jahreszahlung von <br
                            className="d-sm-none"/> {actualUtilityBill?.prepaymentYear}€.</Col>

                </Row>
            </Container>
            <Container className="d-flex justify-content-center mt-3">
                <p>
                    Daraus ergibt sich eine{' '}
                    {actualUtilityBill?.finalResult !== undefined
                        ? (actualUtilityBill?.finalResult < 0 ? (
                                <>Rückerstattung in Höhe von {Math.abs(actualUtilityBill?.finalResult)}€.</>
                            ) : (
                                <>Nachzahlung in Höhe von {actualUtilityBill?.finalResult}€.</>
                            )
                        ) : (
                            ''
                        )}
                </p>
            </Container>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <Button className="buttonDelete" variant="danger"
                                onClick={() => onClickDeleteButton(actualUtilityBill?.id)}>
                            löschen
                        </Button>
                    </Col>
                    <Col>
                        <Button className="buttonSubmit" onClick={() => onClickPdfExport(actualUtilityBill?.id)}>
                            PDF Export
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-3 mb-5">
                    <Col>
                        <Button className="buttonBack" variant="outline-dark" onClick={onClickGoBackToGetAll}>
                            zurück
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetailOfUtilityBill;
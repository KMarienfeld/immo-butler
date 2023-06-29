import React from 'react';
import {Button, Container, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {UtilityBillModel} from "../model/UtilityBillModel";

type Props = {
    listOfUtilityBill: UtilityBillModel[];
}

function AllUtilityBills(props: Props) {
    const navigate = useNavigate();

    function buttonNewUtilityBill() {
        navigate("/add-utility-bill")
    }

    function clickToSeeDetails(id: string) {
        navigate("/all-bills/utility-bill/" + id)
    }

    return (
        <div>
            {props.listOfUtilityBill.length === 0 ?
                <div className="pageContent">
                    <Container>
                        <Row className="pt-5 d-flex justify-content-center">
                            <h4 className="text-center">
                                Bisher wurde noch nichts erstellt, starte direkt mit deiner ersten
                                Nebenkostenabrechnung!
                            </h4>
                        </Row>
                    </Container>
                    <Container className="mt-4 mb-4">
                        <Row className="text-center">
                            <p>Denke aber daran zuerst die Kostenarten anzulegen, auf die angelegten Kostenarten kannst
                                du dann bei allen zukünftigen Nebenkostenabrechnungen zugreifen.
                                Das spart dir ab der 2. Abrechnung eine Menge Zeit.</p>
                        </Row>
                    </Container>
                    <Container className="d-flex justify-content-center mt-5">
                        <Button className="buttonNewExpenseCategory" onClick={buttonNewUtilityBill}>
                            erste Nebenkostenabrechnung anlegen
                        </Button>
                    </Container>
                </div> :
                <div className="pageContent">
                    <Container className="d-flex justify-content-center pt-5 mb-3">
                        <h3>Hier siehst du alle deine <br className="d-sm-none"/> Nebenkostenabrechnungen: </h3>
                    </Container>
                    <Container className="mt-5 mb-5">
                        <Table className="expenseCategoryCard">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Jahr der Abrechnung</th>
                                <th>Ergebnis</th>
                                <th>Aktion</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {props.listOfUtilityBill.map((currentUtilityBill, index) => (
                                <tr key={currentUtilityBill.id}>
                                    <td><strong>{index + 1}</strong></td>
                                    <td>{currentUtilityBill.year}</td>
                                    <td style={{color: currentUtilityBill.finalResult < 0 ? 'green' : 'red'}}>
                                        {Math.abs(currentUtilityBill.finalResult)}
                                    </td>
                                    <td>
                                        <Button className="buttonNewExpenseCategory m-2"
                                                onClick={() => clickToSeeDetails(currentUtilityBill.id)}>Details</Button>
                                        <br className="d-sm-none"/>
                                        <Button variant="outline-danger" className="m-1">löschen</Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Container className="d-flex pb-5 justify-content-center mt-5">
                            <Button className="buttonNewExpenseCategory" onClick={buttonNewUtilityBill}>
                                neue Nebenkostenabrechnung anlegen
                            </Button>
                        </Container>
                    </Container>
                </div>


            }
        </div>
    );
}

export default AllUtilityBills;
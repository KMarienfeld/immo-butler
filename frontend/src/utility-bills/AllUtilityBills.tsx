import React, {useState} from 'react';
import {Button, Container, Modal, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {UtilityBillModel} from "../model/UtilityBillModel";
import useDeleteUtilityBill from "../hooks/useDeleteUtilityBill";

type Props = {
    listOfUtilityBills: UtilityBillModel[];
    getAllUtilityBills: () => void;
}

function AllUtilityBills(props: Props) {
    const navigate = useNavigate();
    const {deleteUtilityBill} = useDeleteUtilityBill(props);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function buttonNewUtilityBill() {
        navigate("/add-utility-bill")
    }

    function clickToSeeDetails(id: string) {
        navigate("/all-bills/utility-bill/" + id)
    }

    function onClickDeleteButton(id: string) {
        deleteUtilityBill(id)
        handleClose()
    }

    function handleDelete() {
        handleShow();
    }

    return (
        <div>
            {props.listOfUtilityBills.length === 0 ?
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
                                <th>Immobilie</th>
                                <th>Ergebnis</th>
                                <th>Aktion</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {props.listOfUtilityBills.map((currentUtilityBill, index) => (
                                <>
                                    <tr key={currentUtilityBill.id}>
                                        <td><strong>{index + 1}</strong></td>
                                        <td>{currentUtilityBill.year}</td>
                                        <td>{currentUtilityBill.designationOfRealEstate}</td>
                                        <td style={{color: currentUtilityBill.finalResult < 0 ? 'green' : 'red'}}>
                                            {Math.abs(currentUtilityBill.finalResult)}€
                                        </td>
                                        <td>
                                            <Button className="buttonNewExpenseCategory m-2"
                                                    onClick={() => clickToSeeDetails(currentUtilityBill.id)}>
                                                Details
                                            </Button>
                                            <br className="d-sm-none"/>
                                            <Button variant="outline-danger" className="m-1"
                                                    onClick={handleDelete}>
                                                löschen
                                            </Button>
                                        </td>
                                    </tr>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Nebekostenabrechnung löschen</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Sicher, dass du diese Nebenkostenabrechnung löschen möchtest?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="outline-dark" onClick={handleClose}
                                                    className="goBackButtonModal">
                                                zurück
                                            </Button>
                                            <Button variant="primary"
                                                    onClick={() => onClickDeleteButton(currentUtilityBill.id)}
                                                    className="submitButtonModal">ja</Button>
                                        </Modal.Footer>
                                    </Modal></>
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
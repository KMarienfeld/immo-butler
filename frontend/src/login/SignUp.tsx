import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import logo from "../logo_tuerkis.png";
import {UserDTO} from "./UserDTO";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function SignUp() {
    const navigate = useNavigate();
    const [userDTORequest, setUserDTORequest] = useState<UserDTO>({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    function onSubmitRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post("/user/signUp", userDTORequest)
            .then(r => {
                navigate("/login")
                toast.success("Die Registrierung war erfolgreich!")
            })
            .catch(error => {
                const errorData = error?.response?.data;
                if (errorData) {
                    const errorMessages: string[] = Object.values(errorData);
                    errorMessages.forEach((errorMessage: string) => {
                        toast.error(errorMessage);
                    });
                } else {
                    toast.error("Es kam zu einem Fehler bei der Registrierung!");
                }
            })
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setUserDTORequest(newUser => ({...newUser, [name]: value}));
    }

    return (
        <div>
            <div className="pageContent d-flex align-items-center">
                <Container className="d-flex justify-content-center">
                    <Row>
                        <Col>
                            <Container className="d-flex justify-content-center">
                                <div className="authenticationCard">
                                    <div className="divLogo">
                                        <img alt="logoImmoButler" className="logo" src={logo}/>
                                    </div>
                                    <Form onSubmit={onSubmitRegister}>
                                        <Form.Group className="mb-3" controlId="formFirstName">
                                            <Form.Label htmlFor="formFirstName">Vorname</Form.Label>
                                            <Form.Control onChange={onChangeHandler} placeholder="Vorname"
                                                          value={userDTORequest.firstname}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formLastName">
                                            <Form.Label htmlFor="formLastName">Nachname</Form.Label>
                                            <Form.Control onChange={onChangeHandler} placeholder="Nachname"
                                                          value={userDTORequest.lastname}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label htmlFor="formEmail">E-Mail Adresse</Form.Label>
                                            <Form.Control type="email" onChange={onChangeHandler}
                                                          placeholder="E-Mail Adresse" value={userDTORequest.email}/>
                                            <Form.Text className="text-muted">
                                                Deine E-Mail Adresse wird nicht an Dritte weitergegeben.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formPassword">
                                            <Form.Label htmlFor="formPassword">Passwort</Form.Label>
                                            <Form.Control type="password" onChange={onChangeHandler}
                                                          placeholder="Passwort" value={userDTORequest.password}/>
                                        </Form.Group>
                                        <Button className="loginButton" type="submit">
                                            Jetzt registrieren
                                        </Button>
                                    </Form>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default SignUp;

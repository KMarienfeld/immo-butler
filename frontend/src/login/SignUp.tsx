import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import logo from "../logo_tuerkis.png";

function SignUp() {

    function onSubmitRegister() {

    }

    function onChangeHandlerFirstname() {

    }

    function onChangeHandlerLastname() {

    }

    function onChangeHandlerEmail() {

    }

    function onChangeHandlerPassword() {

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
                                            <Form.Control onChange={onChangeHandlerFirstname} placeholder="Name"/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formLastName">
                                            <Form.Label htmlFor="formLastName">Nachname</Form.Label>
                                            <Form.Control onChange={onChangeHandlerLastname} placeholder="Nachname"/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label htmlFor="formEmail">E-Mail Adresse</Form.Label>
                                            <Form.Control type="email" onChange={onChangeHandlerEmail}
                                                          placeholder="E-Mail Adresse"/>
                                            <Form.Text className="text-muted">
                                                Deine E-Mail Adresse wird nicht an Dritte weitergegeben.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formPassword">
                                            <Form.Label htmlFor="formPassword">Passwort</Form.Label>
                                            <Form.Control type="password" onChange={onChangeHandlerPassword}
                                                          placeholder="Passwort"/>
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

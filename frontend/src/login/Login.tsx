import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./Login.css"
import logo from "../logo_tuerkis.png";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <div className="pageContent d-flex align-items-center">
                <Container className="d-flex justify-content-center">
                    <Row>
                        <Col>
                            <Container className="d-flex justify-content-center">
                                <div className="authenticationCard">
                                    <div className="divLogo">
                                        <img className="logo" src={logo}/>
                                    </div>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>E-Mail Adresse</Form.Label>
                                            <Form.Control type="email" placeholder="E-Mail Adresse" />
                                            <Form.Text className="text-muted">
                                                Deine E-Mail Adresse wird nicht an Dritte weitergegeben.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Passwort</Form.Label>
                                            <Form.Control type="password" placeholder="Passwort" />
                                        </Form.Group>
                                        <Button className="loginButton" type="submit">
                                            Login
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

export default Login;
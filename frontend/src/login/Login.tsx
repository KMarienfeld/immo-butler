import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./Login.css"
import logo from "../logo_tuerkis.png";
import {useNavigate} from "react-router-dom";

type Props = {
    login: (username:string, password:string) => Promise<void>
}
function Login(props:Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.login(username, password)
            .then(() => {
                nav("/all-bills")
            })
            .catch((error) => {
                console.error("Error beim Login: ", error)
            })
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
                                        <img className="logo" src={logo}/>
                                    </div>
                                    <Form onSubmit={loginOnSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>E-Mail Adresse</Form.Label>
                                            <Form.Control type="email" onChange={onChangeHandlerUsername} placeholder="E-Mail Adresse" />
                                            <Form.Text className="text-muted">
                                                Deine E-Mail Adresse wird nicht an Dritte weitergegeben.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Passwort</Form.Label>
                                            <Form.Control type="password" onChange={onChangeHandlerPassword} placeholder="Passwort" />
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
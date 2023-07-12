import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import logo from "../logo_tuerkis.png";
import {UserDTO} from "./UserDTO";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Eye, EyeSlash} from "react-bootstrap-icons";

function SignUp() {
    const navigate = useNavigate();
    const [userDTORequest, setUserDTORequest] = useState<UserDTO>({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);

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

    function toggleShowPassword() {
        setShowPassword(!showPassword)
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
                                            <Form.Label>Vorname</Form.Label>
                                            <Form.Control onChange={onChangeHandler} placeholder="Vorname"
                                                          value={userDTORequest.firstname} name="firstname"/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formLastName">
                                            <Form.Label>Nachname</Form.Label>
                                            <Form.Control onChange={onChangeHandler} placeholder="Nachname"
                                                          value={userDTORequest.lastname} name="lastname"/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label>E-Mail Adresse</Form.Label>
                                            <Form.Control type="email" onChange={onChangeHandler}
                                                          placeholder="E-Mail Adresse" value={userDTORequest.email}
                                                          name="email"/>
                                            <Form.Text className="text-muted">
                                                Deine E-Mail Adresse wird nicht an Dritte weitergegeben.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Passwort</Form.Label>
                                            <div className="input-group">
                                                <Form.Control type={showPassword ? "text" : "password"}
                                                              onChange={onChangeHandler} placeholder="Passwort"
                                                              value={userDTORequest.password} name="password"/>
                                                <Button variant="outline-secondary" onClick={toggleShowPassword}>
                                                    {showPassword ? <Eye></Eye> : <EyeSlash></EyeSlash>}
                                                </Button>
                                            </div>
                                        </Form.Group>
                                        <Form.Text>Du hast bereits einen Account? Hier gehts zum <Link
                                            to="/login">Login</Link>!</Form.Text>
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

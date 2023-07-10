import React from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import logo from "../logo_tuerkis.png"
import "./Header.css"
import {Link} from "react-router-dom";
import {BoxArrowRight} from "react-bootstrap-icons";

type Props = {
    logout: () => void
}

function Header(props: Props) {
    return (
        <header>
            <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
                <Container>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logo}
                            className="d-inline-block align-top"
                            width="100px"
                            height="auto"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav>
                            <Link className="menuLink" to="/all-utility-bills">Nebenkostenabrechnung</Link>
                            <Link className="menuLink" to="/all-real-estates">Immobilien</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Button className="buttonLogout justify-content-end ms-auto"
                            onClick={props.logout}><BoxArrowRight/> Logout</Button>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap'
import logo from "../logo_tuerkis.png"
import "./Header.css"
import {Link} from "react-router-dom";

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect >
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
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
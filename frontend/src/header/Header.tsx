import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import logo from "../logo_tuerkis.png"
import "./Header.css"
import {Link} from "react-router-dom";
function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" fixed="top" expand="sm" collapseOnSelect >
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
                                <Nav.Link className="menuLink" href="/all-bills">Nebenostenabrechnung</Nav.Link>
                                <Nav.Link className="menuLink" href="/all-expense-categories">Kostenarten</Nav.Link>
                                <Link to="/all-expense-categories">Kostenart</Link>
                                <Link to="/all-bills">Nebenostenabrechnung</Link>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
import React, {useState} from 'react';
import {Button, Container, Dropdown, Nav, Navbar} from 'react-bootstrap'
import logo from "../logo_tuerkis.png"
import "./Header.css"
import {Link} from "react-router-dom";
import {BoxArrowRight} from "react-bootstrap-icons";

type Props = {
    logout: () => void
}

function Header(props: Props) {
    const [selectedMenu, setSelectedMenu] = useState('');

    const handleMenuClick = (menu:string) => {
        setSelectedMenu(menu);
    };
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
                            <Dropdown className="menuLink">
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Profil
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleMenuClick('Buy&Hold')}>
                                        Buy&Hold
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleMenuClick('Fix&Flip')}>
                                        Fix&Flip
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
x                            {selectedMenu === 'Buy&Hold' &&
                                <>
                                    <Nav.Link>
                                        <Link className="menuLink" to="/dashboard">Dashboard</Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="menuLink" to="/all-utility-bills">Nebenkostenabrechnung</Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="menuLink" to="/all-real-estates">Immobilien</Link>
                                    </Nav.Link>
                                </>
                            }
                            {selectedMenu === 'Fix&Flip' &&
                                <>
                                    <Nav.Link>
                                        <Link className="menuLink" to="/fix-flip/calculation">Kalkulation</Link>
                                    </Nav.Link>
                                </>
                            }
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
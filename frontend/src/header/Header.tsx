import React from 'react';
import {Container, Navbar} from 'react-bootstrap'
import logo from "../logo_tuerkis.png"
function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logo}
                            className="d-inline-block align-top"
                        />{' '}
                        Logo
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
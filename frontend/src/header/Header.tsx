import React from 'react';
import {Container, Navbar} from 'react-bootstrap'
import logo from "../logo_tuerkis.png"
function Header() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={logo}
                            className="d-inline-block align-top"
                        />{' '}
                        React Bootstrap
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
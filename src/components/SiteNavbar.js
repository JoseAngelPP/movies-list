import React from 'react';
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'

import {
    Navbar,
    Container,
    Nav,
} from 'react-bootstrap';



function SiteNavbar(props) {
    const firebase = useFirebaseApp();

    const logout = async () => {
        await firebase.auth().signOut();
    }

    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand>Movies list</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default SiteNavbar;
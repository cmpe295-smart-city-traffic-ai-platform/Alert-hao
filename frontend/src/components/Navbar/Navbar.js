import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
    function signOut(event) {
        event.preventDefault();
        localStorage.clear();
        window.location = "/login";
    }
    const email = localStorage.getItem("email");
    const user_id = localStorage.getItem("user_id");
    return (
        <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand>Smart City </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {user_id !== null ? 
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/alerts">Alerts</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/settings">Settings</Nav.Link>
                        <Nav.Link eventKey={2} onClick={signOut}>
                            Log Out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                :
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} href="/login">
                            Log in
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            } 
        </Container>
        </Navbar>
        );
}

export default NavigationBar;
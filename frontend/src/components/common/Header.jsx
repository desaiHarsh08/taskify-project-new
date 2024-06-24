import React from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap'
import Sidebar from './Sidebar'

const Header = () => {
    return (
        <header>
            <Navbar expand={'md'} className="bg-body-tertiary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="/taskify-logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Taskify Software
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                        placement="end"
                        data-bs-theme="dark"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                                Sidebar
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {window.innerWidth < 767 && <Sidebar />}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
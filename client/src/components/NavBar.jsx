import React, {useContext} from 'react';
import {Context} from "../index";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../constants/consts";
import {ADMIN_ROUTE, USER_ROUTE} from "../constants/consts";
import {observer} from "mobx-react-lite";
import LocalePicker from "./forms/LocalePicker";
import { FormattedMessage } from 'react-intl'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logout = () => {
        user.setIsAuth(false)
        user.setUser({})
        navigate(LOGIN_ROUTE)
        localStorage.removeItem('token')
    }
    const expand = false
    return (    <Container>
                    <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                        <Container fluid>
                            <Navbar.Brand>
                                <NavLink to={MAIN_ROUTE} style={{color: 'black'}}>
                                    <FormattedMessage id='app.name' />
                                </NavLink>
                            </Navbar.Brand>

                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">
                                    <FormattedMessage id='app.header.search' />
                                </Button>
                            </Form>
                                <LocalePicker />
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="end"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        {user ? user.email : 'User is not auth'}
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                                      {   user.isAuth
                                            ? <Nav className="justify-content-end flex-grow-1 pe-3">
                                                <Button
                                                    onClick={() => navigate(USER_ROUTE)}
                                                    className="ml-2 mx-2 mb-2"
                                                    variant="secondary"
                                                >
                                                    <FormattedMessage id='app.header.menu.user' />
                                                </Button>
                                                <Button
                                                    onClick={() => navigate(ADMIN_ROUTE)}
                                                    className="ml-2 mx-2 mb-2"
                                                    variant="secondary"
                                                >
                                                    <FormattedMessage id='app.header.menu.admin' />
                                                </Button>
                                                <Button
                                                    onClick={() => logout()}
                                                    variant="danger"
                                                    className="ml-2 mx-2 mb-2"
                                                >
                                                    <FormattedMessage id='app.header.menu.logout' />
                                                </Button>
                                            </Nav>
                                            : <Nav className="justify-content-end flex-grow-1 pe-3">
                                                <Button
                                                    onClick={() => navigate(LOGIN_ROUTE)}
                                                    variant="secondary"
                                                    className="ml-2 mx-2 mb-2"
                                                >
                                                    <FormattedMessage id='app.header.menu.login' />
                                                </Button>
                                            </Nav>
                                    }

                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                </Container>
    );
})

export default NavBar;
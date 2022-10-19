import React, {useContext} from 'react';
import {Context} from "../index";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {ADMIN_ROUTE, USER_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logout = () => {
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }
    return (
        <Navbar bg="light" className="mb-3">
            <Container>
                <Navbar.Brand>
                    <NavLink to={MAIN_ROUTE} style={{color: 'black'}}>MyCollection</NavLink>
                </Navbar.Brand>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                    {user.isAuth
                        ?    <Nav className="ml-auto" style={{color: '#000'}}>
                                <Button
                                    onClick={() => navigate(USER_ROUTE)}
                                    className="ml-2"
                                    variant="secondary"
                                >
                                    User page
                                </Button>
                                <Button
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                    className="ml-2"
                                    variant="secondary"
                                >
                                    Admin page
                                </Button>
                                <Button
                                    onClick={() => logout()}
                                    variant="danger"
                                >
                                    Logout
                                </Button>
                            </Nav>

                        :   <Nav className="ml-auto" style={{color: '#000'}}>
                                <Button
                                    onClick={() => navigate(LOGIN_ROUTE)}
                                    variant="secondary"
                                >
                                    SignIn
                                </Button>
                            </Nav>
                    }

            </Container>
        </Navbar>

    );
});

export default NavBar;
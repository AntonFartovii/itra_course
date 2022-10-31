import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Context} from "../index";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ToastContainer from 'react-bootstrap/ToastContainer';

import {NavLink, useNavigate} from "react-router-dom";
import {ITEM_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, TAG_ROUTE} from "../constants/consts";
import {ADMIN_ROUTE, USER_ROUTE} from "../constants/consts";
import {observer} from "mobx-react-lite";
import LocalePicker from "./forms/LocalePicker";
import { FormattedMessage } from 'react-intl'
import {ListGroup, Toast} from "react-bootstrap";
import {fetchItems} from "../http/itemAPI";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [items, setItems] = useState([])
    const [query, setQuery] = useState('')
    const [showB, setShowB] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const toggleShowB = () => setShowB(true);

    useEffect(() => {
        setIsLoading(true)
        fetchItems(null, null, 100).then( data => {
            setItems( data.rows )
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    const searchedItems = useMemo( () => {
        return items.filter( item => item.name.includes( query ) )
    }, [query])

    const logout = () => {
        user.setIsAuth(false)
        user.setIsAuthor(false)
        user.setUser({})
        navigate(LOGIN_ROUTE)
        localStorage.removeItem('token')
    }

    const expand = false
    return (
                <div>
                    <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                            <Navbar.Brand>
                                <NavLink to={MAIN_ROUTE} style={{color: 'black'}}>
                                    <FormattedMessage id='app.name' />
                                </NavLink>
                            </Navbar.Brand>
                            <LocalePicker />
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="end"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        {user ? user.user.email : 'User is not auth'}
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                        {   user.isAuth
                                            ? <Nav className="justify-content-end flex-grow-1 pe-3">
                                                <Nav.Item>
                                                    <Nav.Link href={TAG_ROUTE}>Tags</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link href={USER_ROUTE}>
                                                        <FormattedMessage id='app.header.menu.user' />
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link href={ADMIN_ROUTE}>
                                                        <Button
                                                            className="ml-2 mx-2 mb-2"
                                                            variant="secondary"
                                                        >
                                                            <FormattedMessage id='app.header.menu.admin' />
                                                        </Button>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link>
                                                        <Button
                                                            onClick={() => logout()}
                                                            variant="danger"
                                                            className="ml-2 mx-2 mb-2"
                                                        >
                                                            <FormattedMessage id='app.header.menu.logout' />
                                                        </Button>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                            : <Nav className="justify-content-end flex-grow-1 pe-3">
                                                <Nav.Item>
                                                    <Nav.Link href={LOGIN_ROUTE}>
                                                        <Button
                                                            variant="secondary"
                                                            className="ml-2 mx-2 mb-2"
                                                        >
                                                            <FormattedMessage id='app.header.menu.login' />
                                                        </Button>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                    }

                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                    </Navbar>
                    <Row>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onInput={(e) => setQuery(e.target.value)}
                                onFocus={() => setShowB(true)}
                                value={query}
                            />
                        </Form>
                    </Row>
                    <Row style={{position:'relative'}}>
                        <ToastContainer position="top-start">
                            <Toast
                                onClose={toggleShowB} show={showB} animation={false}>
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">Поиск</strong>
                                    <small></small>
                                </Toast.Header>
                                <Toast.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <ListGroup variant="flush">
                                        {

                                            !searchedItems
                                            ?   ''
                                            :   searchedItems.map( item =>
                                                <Nav.Link
                                                    key={item.id}
                                                    href={ITEM_ROUTE + '/' + item.id}
                                                    value={item.name}
                                                    onClick={(e) => {
                                                        setQuery('')
                                                        setShowB(false)
                                                    }}
                                                    >
                                                        {item.name}
                                                </Nav.Link>
                                            )
                                        }
                                        </ListGroup>
                                    </Nav>
                                </Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </Row>
                </div>
    );
})

export default NavBar;
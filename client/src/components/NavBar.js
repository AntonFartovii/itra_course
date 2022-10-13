import React, {useContext} from 'react';
import {Context} from "../index";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <NavLink to={SHOP_ROUTE} style={{color: 'white'}}>Купи Девайс</NavLink>
                {user.isAuth
                    ?    <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button onClick={() => user.setIsAuth(false)}  variant={"outline-light"}>Выйти</Button>
                            <Button className="ml-2" variant={"outline-light"}>Админ панель</Button>
                        </Nav>

                    :   <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button onClick={() => user.setIsAuth(true)} variant={"outline-light"}>Авторизация</Button>
                        </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
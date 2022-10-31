import React, {useContext, useState} from 'react';
import {Container, Form, Button} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../constants/consts.js";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {MAIN_ROUTE} from "../constants/consts";
import { FormattedMessage } from 'react-intl'

const AuthPage = () => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            if ( data.role === 'ADMIN') user.setIsAdmin(true);
            navigate(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    {   isLogin
                        ? <FormattedMessage id='auth.page.authorization' />
                        : <FormattedMessage id='auth.page.registration' />
                    }</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                <FormattedMessage id='auth.page.question.register' />
                                <NavLink to={REGISTRATION_ROUTE}>
                                    <FormattedMessage id='auth.page.question.register.link' />
                                </NavLink>
                            </div>
                            :
                            <div>
                                <FormattedMessage id='auth.page.question.enter' />
                                <NavLink to={LOGIN_ROUTE}>
                                    <FormattedMessage id='auth.page.question.enter.link' />
                                </NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {
                                isLogin
                                    ? <FormattedMessage id='button.enter'/>
                                    : <FormattedMessage id='auth.page.registration'/>
                            }
                        </Button>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default AuthPage;
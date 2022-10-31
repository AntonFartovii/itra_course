
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import {useContext, useEffect, useState} from "react";
import {check} from "./http/userAPI";
import {Spinner, ThemeProvider} from "react-bootstrap";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import localStorageKeys from "./constants/localStorageKeys";
import locales from "./constants/locales";
import { IntlProvider } from "react-intl";

import Container from 'react-bootstrap/Container';
import enMessages from "./localizations/en.json";
import ruMessages from "./localizations/ru.json";
import byMessages from "./localizations/by.json";
import Header from "./common/Header";
import Content from "./common/Content";

const messages = {
    [locales.EN]: enMessages,
    [locales.RU]: ruMessages,
    [locales.BY]: byMessages,
};
const App = observer( () => {
    const {user, localization} = useContext(Context)
    const [loading, setLoading] = useState(true)

    localization.setLocalization(
        localStorage.getItem(localStorageKeys.LOCALIZATION) || locales.BY
    )

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            if ( data.role === 'ADMIN') user.setIsAdmin(true);
            user.setIsBan( data.banned )
        }).finally(() => setLoading(false))
    }, [])

    if (loading) return <Spinner animation={"grow"}/>;

    return (

        <IntlProvider locale={localization.localization} messages={messages[localization.localization]}>
            <ThemeProvider
                breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                minBreakpoint="xxs"
            >
                <div className="App">
                    <BrowserRouter>
                        <Container fluid>
                            <Container  className="mb-3">
                                <Header/>
                            </Container>
                            <Container fluid="sm">
                                <Content>
                                    <AppRouter/>
                                </Content>
                            </Container>
                        </Container>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        </IntlProvider>
    );
})

export default App;

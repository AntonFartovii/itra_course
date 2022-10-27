
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useContext, useEffect, useState} from "react";
import {check} from "./http/userAPI";
import {Spinner, ThemeProvider} from "react-bootstrap";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import localStorageKeys from "./constants/localStorageKeys";
import locales from "./constants/locales";
import { IntlProvider } from "react-intl";

import enMessages from "./localizations/en.json";
import plMessages from "./localizations/pl.json";
import esMessages from "./localizations/es.json";
import ruMessages from "./localizations/ru.json";

const messages = {
    [locales.EN]: enMessages,
    [locales.PL]: plMessages,
    [locales.ES]: esMessages,
    [locales.RU]: ruMessages,
};
const App = observer( () => {
    const {user, localization} = useContext(Context)
    const [loading, setLoading] = useState(true)

    localization.setLocalization(
        localStorage.getItem(localStorageKeys.LOCALIZATION) || locales.EN
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
                        <NavBar/>
                        <AppRouter/>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        </IntlProvider>
    );
})

export default App;

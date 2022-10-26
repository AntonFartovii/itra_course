import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import MainPage from "../pages/MainPage";

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map( ({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}

            {publicRoutes.map( ({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            <Route path="*" element={<MainPage/>}></Route>
        </Routes>
    );
};

export default AppRouter;
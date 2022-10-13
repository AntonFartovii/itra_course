import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import Shop from "../pages/Shop";
import {Context} from "../index";

const AppRouter = () => {
    const isAuth = false
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {isAuth && authRoutes.map( ({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}

            {publicRoutes.map( ({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            <Route path="*" element={<Shop/>}></Route>
        </Routes>
    );
};

export default AppRouter;
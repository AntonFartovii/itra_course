import {
    ADMIN_ROUTE,
    COLLECTION_PAGE_ROUTE, ITEM_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    USER_ROUTE
} from "./constants/consts";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import Main from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import CollectionPage from "./pages/CollectionPage";
import ItemPage from "./pages/ItemPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage/>,
    },
    {
        path: ADMIN_ROUTE + '/user/:id',
        Component: <UserPage/>,
    },

    {
        path: USER_ROUTE,
        Component: <UserPage/>
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main/>,
    },
    {
        path: LOGIN_ROUTE,
        Component: <AuthPage/>,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <AuthPage/>,
    },
    {
        path: COLLECTION_PAGE_ROUTE + '/:id',
        Component: <CollectionPage/>
    },
    {
        path: ITEM_ROUTE + '/:id',
        Component: <ItemPage/>
    }
]
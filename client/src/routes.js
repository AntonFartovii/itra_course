import {
    ADMIN_ROUTE,
    COLLECTION_PAGE_ROUTE, ITEM_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    USER_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Main from "./pages/Main";
import UserPage from "./pages/UserPage";
import CollectionPage from "./pages/CollectionPage";
import ItemPage from "./pages/ItemPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>,
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
        Component: <Auth/>,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>,
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
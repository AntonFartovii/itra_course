import {
    ADMIN_ROUTE,
    BASKET_ROUTE, COLLECTION_PAGE_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE, USER_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Admin from "./pages/Admin";
import Main from "./pages/Main";
import UserPage from "./pages/UserPage";
import CollectionPage from "./pages/CollectionPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>,
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
]
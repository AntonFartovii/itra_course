import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./stores/UserStore";
import ItemStore from "./stores/ItemStore";
import {CollectionStore} from "./stores/CollectionStore";
import {TagStore} from "./stores/TagStore";
import {AdminStore} from "./stores/AdminStore";
import locales from "./constants/locales";
import LocalStore from "./stores/localStore";
import CommentStore from "./stores/commentStore";

export const Context = createContext({
    locale: locales.EN
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
            <Context.Provider value={{
                user: new UserStore(),
                admin: new AdminStore(),
                item: new ItemStore(),
                collection: new CollectionStore(),
                tag: new TagStore(),
                localization: new LocalStore(),
                commentStore: new CommentStore()
            }}>
                <App />
            </Context.Provider>
    </React.StrictMode>
);


// Компонент Provider
// После создания контекста, его требуется использовать совместно с компонентом Provider,
// который позволяет дочерним компонентам подписаться на его изменения.
// Если проще, то благодаря компоненту Provider все дочерние компоненты могут получить значения, которые мы ему передаем.
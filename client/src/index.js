import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
            <Context.Provider value={{
                user: new UserStore()
            }}>
                <App />
            </Context.Provider>
);


// Компонент Provider
// После создания контекста, его требуется использовать совместно с компонентом Provider,
// который позволяет дочерним компонентам подписаться на его изменения.
// Если проще, то благодаря компоненту Provider все дочерние компоненты могут получить значения, которые мы ему передаем.
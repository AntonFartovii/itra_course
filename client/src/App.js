
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useContext, useEffect, useState} from "react";
import {check, fetchUser} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const App = observer( () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            if ( data.role === 'ADMIN') user.setIsAdmin(true);
        }).finally(() => setLoading(false))

    }, [])

    if (loading) return <Spinner animation={"grow"}/>;

    return (
      <div className="App">
           <BrowserRouter>
              <NavBar/>
              <AppRouter/>
          </BrowserRouter>
      </div>

    );
})

export default App;

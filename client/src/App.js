
// import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useContext, useEffect, useState} from "react";
import {check, fetchUser} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {Context} from "./index";

function App() {
    const {user} = useContext(Context)
    console.log('user.isAuth: ', user.isAuth)
    console.log('user.user: ', user)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))

    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
      <div className="App">
           <BrowserRouter>
              <NavBar/>
              <AppRouter/>
          </BrowserRouter>
      </div>

  );
}

export default App;

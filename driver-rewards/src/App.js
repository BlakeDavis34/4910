// import {Box, Text} from '@chakra-ui/react'
import Nav from './components/NavBar'
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom"
import axios from 'axios'
import React from "react"
import Login from "./Login"
import Register from "./Register"
import Dashboard from "./pages/Dashboard/Dashboard"
import Landing from "./pages/Landing/Landing"
import "./App.css"
import Cookies from 'js-cookie'
import * as authtools from './authtools'


const baseUrl = 'https://o63s0n6hl9.execute-api.us-east-1.amazonaws.com/login-demo/'

const requestConfig = {
    headers: {
        'x-api-key': 'x6GaDjuUzPa0MBiphcMoo30GQJm06K6IaD6sSPWf'
    }
}

function App() {

    const [auth, setAuth] = React.useState(false);

    const authStateChange = (newState) => {
        setAuth(newState)
    }

    if(!auth){
        return(
            <Landing
                authState={auth}
                changeAuthState={authStateChange}
            />
        )
    }

    return (

        <div className="App">
            <BrowserRouter>
                <div className="header">
                    <NavLink exact activeClassName="active" to="/">Dashboard</NavLink>
                    <NavLink activeClassName="active" to="/register">Register</NavLink>
                    <NavLink activeClassName="active" to="/login">Login</NavLink>
                </div>

                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Dashboard}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>

                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

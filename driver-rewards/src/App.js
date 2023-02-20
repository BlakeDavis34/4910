import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom"
import React from "react"
import Dashboard from "./pages/Dashboard/Dashboard"
import Landing from "./pages/Landing/Landing"
import Profile from "./pages/Profile/Profile"
import "./App.css"
import MenuBar from './components/MenuBar/MenuBar'


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
                    <MenuBar/>

                    {/*<NavLink exact activeClassName="active" to="/">Dashboard</NavLink>*/}

                </div>

                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Dashboard}/>
                        <Route exact path="/profile" component={Profile}/>
                    </Switch>

                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

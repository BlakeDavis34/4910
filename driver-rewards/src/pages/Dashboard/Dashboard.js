import React from 'react'
import Cookies from "js-cookie";
import authtools from "../../authtools";
import axios from "axios";
import SideMenu from '../../components/SideMenu/SideMenu'

const Dashboard = () => {

    // const request = {
    //     username: Cookies.get('TruckName')
    // }

    //console.log("REQUEST = " + JSON.stringify(request))

    // <SideMenu></SideMenu>

    // const user = authtools.callApi("GET", "user", request)
    const user = authtools.getUser(Cookies.get('TruckName'))

    console.log("USER = " + user)

    //const [currUser, setCurrUser] = React.useState(user)

    return (

        <div>
            {/*<SideMenu></SideMenu>*/}
            Hello {user}
            <button onClick={(e) => {
                Cookies.set('TruckSession', '')
                Cookies.set('TruckName', '')
                //setCurrUser('')
                window.location.reload()
            }}><br/><br/>Logout</button>
        </div>
    )
}

export default Dashboard
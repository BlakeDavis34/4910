import React from 'react'
import Cookies from "js-cookie";
import * as authtools from "../../authtools";
import axios from "axios";

const Dashboard = () => {

    const user = Cookies.get('TruckUser')

    const [currUser, setCurrUser] = React.useState(user)

    return (
        <div>
            Hello {currUser}
            <button onClick={(e) => {
                Cookies.set('TruckSession', '')
                Cookies.set('TruckName', '')
                Cookies.set('TruckUsername', '')
                Cookies.set('TruckBirthday', '')
                Cookies.set('TruckGender', '')
                setCurrUser('')
                window.location.reload()
            }}><br/><br/>Logout</button>
        </div>
    )
}

export default Dashboard
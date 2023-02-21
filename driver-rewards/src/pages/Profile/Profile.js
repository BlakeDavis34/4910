import React from "react"
import Cookies from "js-cookie";

const Profile = () => {
    
    const name = Cookies.get('TruckName')
    const user = Cookies.get('TruckUser')
    const email = Cookies.get('TruckEmail')
    const birthday = Cookies.get('TruckBirthday')
    const gender = Cookies.get('TruckGender')

    const [currUser, setCurrUser] = React.useState(user)

    return (
        <div>
            Name: {name}<br></br>
            Username: {user}<br></br>
            Email: {email}<br></br>
            DOB: {birthday}<br></br>
            Gender: {gender}<br></br>

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

export default Profile
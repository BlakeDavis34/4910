import React, {useEffect, useState} from 'react'
import authtools from "../../authtools";
import Loading from "../../components/Loading/loading";
import utils from "../../utils"

const Dashboard = () => {


    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const [currUser, setCurrUser] = React.useState(user)

    return (
        
        <div>
            Hello {user.username}
            <br/>
            User is {JSON.stringify(user)}
        </div>
    )
}

export default Dashboard
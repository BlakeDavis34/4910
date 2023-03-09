import React, {useEffect, useState} from 'react'
import authtools from "../../authtools";
import Loading from "../../components/Loading/loading";
import utils from "../../utils"

const Dashboard = () => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            setLoading(true)
            authtools.getUser().then((response) => {
                console.log("AT GETDATA = " + JSON.stringify(response.data))
                setLoading(false)
                setUser((response.data.user))
            })
        } catch (error) {
            setLoading(false);
            authtools.handleError(error)
            console.log(error);
        }
    }, []);

    if(loading){
        return (
            <Loading/>
        )
    }

    return (
        <div>
            Hello {user.username}
            <br/>
            User is {JSON.stringify(user)}
        </div>
    )
}

export default Dashboard
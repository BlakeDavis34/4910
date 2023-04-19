import React, {useEffect, useState} from 'react'
import authtools from "../../authtools";
import axios from 'axios'
import Loading from "../../components/Loading/loading";
import utils from "../../utils"

const Users = () => {

    const [userList, setUserList] = useState({})
    const [loading, setLoading] = useState(true)

    const rqUrl = "https://o63s0n6hl9.execute-api.us-east-1.amazonaws.com/login-demo/user/?username=aj"

    useEffect(() => {
        try {
            setLoading(true)
            axios.get(rqUrl).then((response) => {
                console.log("AT GETDATA = " + JSON.stringify(response.data))
                setLoading(false)
                setUserList((response.data))
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
            Users: {JSON.stringify(userList)}
        </div>
    )
}

export default Users
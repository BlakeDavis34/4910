import axios from 'axios'
import Cookies from "js-cookie";

const requestConfig = {
    headers: {
        'x-api-key': 'x6GaDjuUzPa0MBiphcMoo30GQJm06K6IaD6sSPWf'
    }
}

const baseUrl = 'https://o63s0n6hl9.execute-api.us-east-1.amazonaws.com/login-demo/'

export const verifyToken = (username, token) => {

    console.log("AUTH STATE CHECK PARAMS NAME = " + username + ", TOKEN = " + token)

    const requestBody = {
        user: {
            username: username
        },
        token: token
    }

    axios.post(baseUrl + 'verify', requestBody, requestConfig).then((response) => {
        console.log(response)
        // return response.data.user.username
        return response.data.user.username

        //return response.data.user.username
    }).catch((error) => {
        return error.response.data.message
    })
}

export default { verifyToken }
import axios from 'axios'
import Cookies from "js-cookie";

const requestConfig = {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'x6GaDjuUzPa0MBiphcMoo30GQJm06K6IaD6sSPWf'
    }
}

const baseUrl = 'https://o63s0n6hl9.execute-api.us-east-1.amazonaws.com/login-demo/'

const logout = () => {
    Cookies.set('TruckSession', '')
    Cookies.set('TruckUser', '')
}

const handleResponse = (response) => {
    return response
}

const handleError = (error) => {
    if(error.response.status === '403' || error.response.status === '401'){
        window.location.href = "/"
        logout()
        console.log("403 error...")
        console.log("error = " + error.response.message)
        return "invalid session"
    } else {
        console.log("error = " + error.response.message)
        return error.response.message
    }
}

const authenticate = (username, password) => {
    const reqBody = {
        username: username,
        password: password,
    }

    console.log("username = " + username + " password = " + password)

    axios.post(baseUrl + 'login', reqBody, requestConfig).then((response) => {
        Cookies.set('TruckSession', response.data.token)
        Cookies.set('TruckName', response.data.user.username)
        handleResponse()
        window.location.href = "/dashboard"
        //console.log(response.data)
    }).catch((error) => {
        handleError(error)
        //console.log("MESSAGE = " + error.message)
        return error.response.data.message
    })
}

const callApi = (method, path, request) => {
    if (method === 'POST'){
        axios.post(baseUrl + path, request, requestConfig).then((response) => {
            return handleResponse(response)
        }).catch((error) => {
            return handleError(error)
        })
    } else if (method === 'GET'){
        axios.get(baseUrl + path, requestConfig, request).then((response) => {
            return handleResponse(response)
        }).catch((error) => {
            return handleError(error)
        })
    }
    return null
}

//TODO: ADD TOKEN VERIFICATION
const getUser = async () => {

    var data = JSON.stringify({
        "username": Cookies.get("TruckName"),
        "token": Cookies.get('TruckSession')
    });

    console.log("SESSION = " + Cookies.get('TruckSession'))

    const params = new URLSearchParams([['username', Cookies.get("TruckName")], ['token', Cookies.get('TruckSession')]]);

    var config = {
        method: 'get',
        url: 'https://o63s0n6hl9.execute-api.us-east-1.amazonaws.com/login-demo/user',
        headers: {
            'x-api-key': 'x6GaDjuUzPa0MBiphcMoo30GQJm06K6IaD6sSPWf',
            'Content-Type': 'application/json'
        },
        data : data,
        params : params
    };

    //returns a Promise to return the user data
    return axios(config)
}


export const verify = () => {

    const username = Cookies.get('TruckUser')
    const token = Cookies.get('TruckToken')

    const requestBody = {
        user: {
            username: username
        },
        token: token
    }

    axios.post(baseUrl + 'verify', requestBody, requestConfig).then((response) => {
        console.log(response)

        return response.data.user.username

    }).catch((error) => {
        return error.response.data.message
    })
}

export default { verify, callApi, authenticate, getUser, handleError}
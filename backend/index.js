import * as loginService from './service/login.js'
import * as verifyService from './service/verify.js'
import * as registerService from './service/register.js'

import * as util from './utils/utils.js'

const healthPath = '/health'
const registerPath = '/register'
const loginPath = '/login'
const verifyPath = '/verify'

export const handler = async(event) => {
    console.log('Request Received. Event = ', event)
    let response
    
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200)
            break;
        case event.httpMethod === 'POST' && event.path === registerPath:
            const regBody = JSON.parse(event.body)
            response = await registerService.register(regBody)
            break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body)
            response = await loginService.login(loginBody) 
            break;
        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body)
            response = await verifyService.verify(verifyBody)
            break;
        default:
            response = util.buildResponse(404, "Invalid path")
    }
    return response
};

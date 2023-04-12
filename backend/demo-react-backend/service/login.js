import AWS from 'aws-sdk'

AWS.config.update({
    region: 'us-east-1'
})
import * as util from '../utils/utils.js'
import CryptoJS from 'crypto-js'
import * as auth from '../utils/auth.js'

const dynamodb = new AWS.DynamoDB.DocumentClient()
const userTable = 'demo-users'


export async function login(user) {
    const username = user.username
    const password = user.password

    if(!user || !username || !password){
        return util.buildResponse(401, {
            message: 'Username and password are required'
        })
    }

    const dynamoUser = await getUser(username)
    if( !dynamoUser || !dynamoUser.username) {
        return util.buildResponse(403, {message: 'User does not exist'});
    }

    if(CryptoJS.AES.decrypt(dynamoUser.password, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8) !== password) {
        return util.buildResponse(403, { message: 'password is incorrect'})
    }
    
    if(dynamoUser.approved === false){
        return util.buildResponse(403, { message: 'Account not approved'})
    }

    const userInfo = {
        username: dynamoUser.username,
        name: dynamoUser.name
    }

    const token = auth.generateToken(userInfo)

    const response = {
        user: userInfo,
        token: token
    }

    return util.buildResponse(200, response)
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error("Error getting user: ", error);
    })
} 

export default { login }

// module.exports.login = login
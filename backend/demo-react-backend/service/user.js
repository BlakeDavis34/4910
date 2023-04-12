import AWS from 'aws-sdk'

AWS.config.update({
    region: 'us-east-1'
})
import * as util from '../utils/utils.js'
//import CryptoJS from 'crypto-js'
import * as auth from '../utils/auth.js'

const dynamodb = new AWS.DynamoDB.DocumentClient()
const userTable = 'demo-users'

async function getUser(user){

    const username = user.username
    const token = user.token
    
    console.log("WE MADE IT... " + username + "    " + token)

    console.log("USER = " + user)

    if(!username){
        return util.buildResponse(400, {
            message: 'No user provided...'
        })
    }

    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }

    const dynamoUser = await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error("Error getting user: ", error);
    })

    const response = {
        user: {
            username: dynamoUser.username,
            name: dynamoUser.name,
            email: dynamoUser.email
        }
    }

    return util.buildResponse(200, response)
}

export async function reqHandler(request){
    switch(true){
        case request.httpMethod === 'GET':
            
            const user = request.queryStringParameters

            return await getUser(user)
    }
}
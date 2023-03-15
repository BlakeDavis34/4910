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

    console.log("USER = " + user)

    const username = user.username

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

export async function crud(request){
    switch(true){
        case request.httpMethod === 'GET':
            console.log("PARAMS = " + JSON.stringify(request))
            const getUserBody = JSON.parse(request.body)
            return await getUser(getUserBody)
    }
}
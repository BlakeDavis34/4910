import AWS from 'aws-sdk'

AWS.config.update({
    region: 'us-east-1'
})
import util from '../utils/utils.js'
import bcrypt from 'bcryptjs'

const dynamodb = new AWS.DynamoDB.DocumentClient()
const userTable = 'demo-users'

export async function register(userInfo) {
    if(!userInfo){
        return util.buildResponse(400, {
            message: 'Your headers are literally trash dude'
        })
    }
    const name = userInfo.name
    const email = userInfo.email
    const username = userInfo.username
    const password = userInfo.password
    if(!username || !password || !email || !name){
        return util.buildResponse(401, {
            message: 'All fields are required'
        })
    }

    const dynamoUser = await getUser(username)

    if(dynamoUser && dynamoUser.user) {
        return util.buildResponse(401, {
            message: 'Username already exists.'
        })
    }

    const encryptedPW = bcrypt.hashSync(password.trim(), 10)
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPW
    }

    //save the user, notify user if unsuccessful
    const saveUserResponse = await saveUser(user)
    if(!saveUserResponse) {
        return util.buildResponse(503, {message: 'Something went wrong. Please try again later.'})
    }

    //if successful
    return util.buildResponse(200, { username: username})

}

async function saveUser(user) {
    const params = {
        TableName: userTable,
        Item: user
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.error("Error saving user: ", error)
    });
}

async function getUser(user) {
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

export default { register }

// module.exports.register = register;


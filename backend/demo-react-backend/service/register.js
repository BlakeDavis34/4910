import AWS from 'aws-sdk'

AWS.config.update({
    region: 'us-east-1'
})
import util from '../utils/utils.js'
//import bcrypt from 'bcryptjs'
import CryptoJS from 'crypto-js'

const dynamodb = new AWS.DynamoDB.DocumentClient()
const userTable = 'demo-users'
const date = new Date()

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
    const dob = userInfo.dob
    const dlNum = userInfo.dlNum
    const sponsorIds = userInfo.sponsorIds
    //const dateCreated = userInfo.datecreated
    
    
    if(!username || !password || !email || !name || !dob || !dlNum || !sponsorIds){
        return util.buildResponse(401, {
            message: 'All fields are required'
        })
    }

    const dynamoUser = await getUser(username.toLowerCase().trim())

    if(dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: 'Username already exists.'
        })
    }
    
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    let currentDate = `${year}-${month}-${year}`;

    const encryptedPW = CryptoJS.AES.encrypt(password, process.env.JWT_SECRET).toString()
    console.error("ENCRYPTED PASSWORD = ", encryptedPW)
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPW,
        dob: dob,
        dlNum: dlNum,
        sponsorIds: sponsorIds,
        dateCreated: currentDate,
        approved: false
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

export default { register }

// module.exports.register = register;


import AWS from 'aws-sdk'

AWS.config.update({
    region: 'us-east-1'
})
import * as util from '../utils/utils.js'
//import CryptoJS from 'crypto-js'
import * as auth from '../utils/auth.js'

const dynamodb = new AWS.DynamoDB.DocumentClient()
const activityTable = 'activities'
const date = new Date()

async function getActivity(activity){
    
    //const userTarget = activity.user
    //const sponsorTarget = activity.sponsor
    //const activityTarget = activity.activityId
    
    const params = {
        TableName: activityTable
    }
    
    const activities = await dynamodb.scan(params).promise().then(response => {
        return response.Items
    })
    
    return util.buildResponse(200, activities)
    

    // if(!username){
    //     return util.buildResponse(400, {
    //         message: 'No user provided...'
    //     })
    // }

    // const params = {
    //     TableName: userTable,
    //     Key: {
    //         username: username
    //     }
    // }

    // const dynamoUser = await dynamodb.get(params).promise().then(response => {
    //     return response.Item;
    // }, error => {
    //     console.error("Error getting user: ", error);
    // })

    // const response = {
    //     user: {
    //         username: dynamoUser.username,
    //         name: dynamoUser.name,
    //         email: dynamoUser.email
    //     }
    // }

    // return util.buildResponse(200, response)
}

async function createActivity(activityInfo){
    
    const activityId = activityInfo.activityId
    const sponsor = activityInfo.sponsorId
    const maxPts = activityInfo.maxPts
    
    //console.log("ITEM = " + activityId + " " + sponsor + "  " + maxPts)
    
    if(!activityId || !sponsor || !maxPts){
        return util.buildResponse(401, {
            message: 'All fields are required'
        })
    }
    
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    let currentDate = `${year}-${month}-${day}`;
    
    const activity = {
        activityId: activityId,
        sponsor: sponsor,
        maxPts: maxPts,
        dateCreated: currentDate
    }
    
    const saveActivityResponse = saveActivity(activity)
    if(!saveActivityResponse) {
        return util.buildResponse(503, {message: 'We encountered an error. Please try again later.'})
    }
    
    return util.buildResponse(200, {activityId: activity.activityId})
}

async function saveActivity(activity) {
    console.log("Attempting to save...")
    const params = {
        TableName: activityTable,
        Item: activity
    }
    return await dynamodb.put(params).promise().then((response) => {
        console.log("ACTIVITY ADDED " + JSON.stringify(response))
    }, error => {
        console.error("Error saving activity: ", error)
    });
    
    // const params = {
    //     TableName: activityTable,
    //     Item: {
    //         activityId: "manualTest2",
    //         sponsorId: "whatthehellshit",
    //         maxPts: 500055,
    //         dateCreated: 69-69-6969
    //     }
    // }
    
    // return await dynamodb.put(params).promise().then(() => {
    //     console.log("got it")
    // }, error => {
    //     console.error("fugma")
    // })
}


export async function reqHandler(request){
    
    switch(true){
        case request.httpMethod === 'GET':
            const activity = request.queryStringParameters

            return await getActivity(activity)
        
        case request.httpMethod === 'POST':
            
            const act = JSON.parse(request.body)
            
            return await createActivity(act)
    }
}
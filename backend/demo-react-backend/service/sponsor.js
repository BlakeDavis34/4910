import AWS from 'aws-sdk'

AWS.config.update({
    region: 'us-east-1'
})
import * as util from '../utils/utils.js'
//import CryptoJS from 'crypto-js'
import * as auth from '../utils/auth.js'

const dynamodb = new AWS.DynamoDB.DocumentClient()
const sponsorTable = 'sponsors'

async function getSponsor(sponsor){
    
    if(!sponsor.sponsorId){
        const params = {
            TableName: sponsorTable
        }
        
        const sponsors = await dynamodb.scan(params).promise().then(response => {
            return response.Items
        })
        
        return util.buildResponse(200, sponsors)
        
    }
    
    const sponsorId = sponsor.sponsorId
    
    console.log("Sponsor called")
    
    const params = {
        TableName: sponsorTable,
        Key: {
            sponsorId: sponsorId
        }
    }
    
    let error = false
    let resp = {}
    
    const mySponsor = await dynamodb.get(params).promise().then(response => {
        const resp = {
            id: response.Item.sponsorId,
            name: response.Item.sponsorName,
            pointVal: response.Item.pointVal
        }
        return util.buildResponse(200, resp)
    }, error => {
        console.error("Error getting sponsor: ", error)
        const response = {
            message: "Sponsor not found"
        }
        return util.buildResponse(404, response)
    })
    
    //use scan for multiget?
    // if(!sponsorUsername){
    //     return util.buildResponse(400, {
    //         message: ''
    //     })
    // }
    
    return mySponsor
    
}



export async function reqHandler(request) {
    switch(true){
        case request.httpMethod === 'GET':
            const sponsor = request.queryStringParameters
            
            return await getSponsor(sponsor)
    }
    
    return null
}
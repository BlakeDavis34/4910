import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
const { sign, verify } = jwt

let hello = jwt.sign({test: "test"}, 'key')

//console.log(hello)

let msg = 'test'
let encMsg = CryptoJS.AES.encrypt(msg, "blah").toString()
let decMsg = CryptoJS.AES.decrypt("U2FsdGVkX198OMikBznvv/uCydWFU8CDRRpc3jTRzBg=", "Demo-Secret-JWT").toString(CryptoJS.enc.Utf8)

console.log("enc= " + encMsg + " dec = " + decMsg)
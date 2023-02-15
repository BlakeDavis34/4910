import * as jwt from 'jsonwebtoken'

export function generateToken(user) {
    if (!user) {
        return null;
    }

    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1h'
    }) 
}

export function verifyToken(username, token) {
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if (error) {
            return {
                verified: false,
                message: 'Invalid token'
            }
        }
        if (response.username !== username) {
            return {
                verified: false,
                message: 'Invalid user'
            }
        }

        return {
            verified: true,
            message: 'User verified'
        }
    })
}

export default { generateToken, verifyToken }

// module.exports.generateToken = generateToken;
// module.exports.verifyToken = verifyToken;
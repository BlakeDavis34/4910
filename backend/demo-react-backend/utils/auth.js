import jwt from 'jsonwebtoken'
const { sign, verify } = jwt

export function generateToken(user) {
    if (!user) {
        return null;
    }

    return sign(user, process.env.JWT_SECRET, {
        expiresIn: '1h'
    }) 
}

export function verifyToken(username, token) {
    return verify(token, process.env.JWT_SECRET, (error, response) => {
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
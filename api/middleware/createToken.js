const jwt = require('jsonwebtoken')

async function createToken (userData) {
    const currentUsername = await userData
    const token = await jwt.sign({
        username: currentUsername[0].username,
        userId: currentUsername[0]._id
    },
        process.env['SECRET_PASSWORD'],
        { expiresIn: 60 * 60}
    )
    return token;
}

module.exports = {
    createToken
}

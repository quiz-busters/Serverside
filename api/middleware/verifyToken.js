const jwt = require('jsonwebtoken'); 
require('dotenv').config();

function verifyToken(req, res, next) {
    
    const header = req.headers['authorization']; // need to add this at frontend fetch request headers

    console.log('verifyToken top level req.headers: ', req.headers)

    if (header) {

        const token = header.split(' ')[1];

        jwt.verify(token, process.env['SECRET_PASSWORD'])
            .then(() => next())
            .catch(error => {
                console.log('Token verification failed');
                res.status(401).json({
                    success: false,
                    message: 'Token verification failed: ', error
                })
            })

    } else {
        res.status(401).json({
            success: false,
            message: 'This requires authorisation'
        })
    }

}

module.exports = verifyToken;

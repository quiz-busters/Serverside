const server = require('./api')
const connectDB = require('../db/connect')
require('dotenv').config()

const port = process.env.PORT || 5000

const DBServerStart = async () => {
    
        await connectDB(process.env.MONGO_URL)
            .then(() => console.log('Connected to the database...'))
            .then(server.listen(port))
            .then(() => console.log(`Server is listening to port ${port}...`))
            .catch(error => console.log('Can\'t connect to db or server: ', error))
             
}

DBServerStart()

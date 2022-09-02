const express = require('express')
const api = express()
const cors = require('cors')

const userController = require('./controllers/user')

require('dotenv').config()

api.use(cors())
api.use(express.json())
api.use(express.urlencoded({extended: false}))

api.get('/leaderboard', userController.findAll)


// Unauthorised routes
api.get('/', (req, res) => {res.json({message: 'Welcome to Habit Harbour'})})



module.exports = api;

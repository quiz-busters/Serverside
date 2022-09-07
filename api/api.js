const express = require('express')
const api = express()
const cors = require('cors')

const userController = require('./controllers/user')

require('dotenv').config()

api.use(cors())
api.use(express.json())
// api.use(express.urlencoded({ extended: false }))

// REGISTER FUNCTION
api.post("/register", userController.register)

// LOGIN FUNCTION 
api.post('/login', userController.login)

// INCREMENT SCORE FUNCTION NEEDED
api.post('/:username/score', userController.incrementScore)


api.get('/users', userController.findAll)

//Find the current user
api.get("/currentUser", userController.currentUser)

api.get("/users/:username", userController.getUser)

//LEADERBOARD FUNCTION
api.get('/leaderboard', userController.findAllByScore)


api.get('/', (req, res) => { res.json({ message: 'Welcome to Quiz Time' }) })

api.post('/createuser', userController.createUser)

module.exports = api;

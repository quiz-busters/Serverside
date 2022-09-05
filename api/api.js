const express = require('express')
const api = express()
const cors = require('cors')

const userController = require('./controllers/user')

require('dotenv').config()

api.use(cors())
api.use(express.json())
// api.use(express.urlencoded({ extended: false }))

api.post('/create', userController.createUser)

// LOGIN FUNCTION NEEDED
// api.post('/login', LOGIN FUNCTION HERE)

// INCREMENT SCORE FUNCTION NEEDED
api.post('/:username/score', userController.incrementScore)


api.get('/users', userController.findAll)

// FUNCTION NEEDED FOR HIGHSCORES ENSURE HIGHEST TO LOWEST
// api.get('Leaderboard', LEADERBOARD FUNCTION)
api.get('/leaderboard', userController.findAllByScore)


api.get('/', (req, res) => { res.json({ message: 'Welcome to Quiz Time' }) })


module.exports = api;

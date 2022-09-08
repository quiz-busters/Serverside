const { response } = require("express");
const User = require('../models/User');
const { errorHandler } = require("../utils");
const jwt = require("jsonwebtoken");

const { getHash, compareHash } = require('../middleware/hash')
const {createToken} = require('../middleware/createToken')

const createUser = async (req, res) => {
    try {
        const username = req.body.username
        const hashedPassword = await getHash(req.body.username)
        const user = await User.create({ 'username': username, 'email': `${username}
        @quiztime.com`, 'password': hashedPassword })
        res.status(201).json({user: user, message: "Player 2 created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}

const register = async (req, res) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const hashedPassword = await getHash(req.body.password)
        const user = await User.create({ 'email': email, 'username': username, 'password' : hashedPassword, image: req.body.image || null})  
        res.status(201).json({user: user,  message: 'User created'})                
    } catch (error) {                       
        res.status(500).json({message: error})
    }

}
    
const login = async (req, res) => {

    try {
        const username = req.body.username
        const currentUser = await User.find({"username" : username})

        let authenticated = await compareHash(req.body.password, currentUser[0]['password'])
        if(authenticated) {
        
            res.json({
                username: username,
                success: true,
                message: 'Successfully logged in',
                token: 'Bearer ' + await createToken(currentUser),
                user: currentUser[0]
            })
        } else {
            throw 'Wrong credentials'
        }
       
    } catch (error) {   
        console.log('Cannot authorise: ', error)                    
        res.status(401).json({
            success: false,
            message: error
        })
    }

}

const findAll = async (req, res) => {
    try {
        const users = await User.find({}).sort({score:-1})
        res.status(200).json({ users })

    } catch (error) {
        res.status(404).json({ message: error })
    }
}


const incrementScore = async (req, res) => {

    try {
        const user = await User.findOne({ "username": req.params.username });

        if (req.body.score !== 0) {
            user.score += req.body.score
            res.json({ user: user.username, score: user.score, message: "Score updated" })
        } else {
            res.send({ message: "Score is 0 - Do better next time" })
        }
        await user.save()

    } catch (error) {
        console.log('Cannot find score for this user')
        res.status(500).json({ error: error })
    }

}

const getUser = async (req, res) => {

    try {
        const user = await User.findOne({ "username": req.params.username });
        res.json(user);

    } catch (error) {
        console.log('Cannot find this user')
        res.status(500).json({ error: error })
    }

}

const findAllByScore = async (req, res) => {
    try {
        const users = await User.find();
        users.sort((a, b) => b.score - a.score)
        res.status(200).json({users});
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

const currentUser = async (req, res) => {
    try {
        const token = req.get("Authorization");
        const data = jwt.verify(token, process.env['SECRET_PASSWORD']);
        if (!data) {
            return res.status(424).json("Invalid token");
        }
        const user = await User.findById(data.userId);
        console.log(user)
        res.json(user);
    } catch (error) {
        res.status(424).json(errorHandler(error));
    }
}

module.exports = {
    findAll,
    incrementScore,
    findAllByScore,
    login,
    register,
    currentUser,
    createUser,
    getUser
}

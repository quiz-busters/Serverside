const { response } = require("express");
const User = require('../models/User');
const { errorHandler } = require("../utils");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    const {username, email, password, image} = req.body
    const exists = await User.findOne({email});

    if (exists) {
        return res.status(424).json({error: "Email already exists"})
    }
    try {
        const user = new User({
            username, email, password, image
        })
        await user.save();
        const token = jwt.sign({userId: user._id}, "secret", {expiresIn: "1d"});
        res.json({user, token})
    } catch (error) {
        res.status(424).json(errorHandler(error));
    }
    

}

const login = async (req, res) => {

    const {email, password} = req.body
    const exists = await User.findOne({email});

    if (!exists) {
        return res.status(424).json({error: "Invalid email"})
    }
    if (exists.password != password) {
        return res.status(424).json({error: "Invalid password"})
    }
    try {
        const token = jwt.sign({userId: exists._id}, "secret", {expiresIn: "1d"});
        res.json({user: exists, token})
    } catch (error) {
        res.status(424).json(errorHandler(error));
    }
}

const findAll = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users })

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

const createUser = async (req, res) => {

    try {
        const username = req.body.username
        const account = await User.create({ 'username': username, })
        res.status(201).json({ username: username, message: 'User created' })

    } catch (error) {
        res.status(500).json({ message: error })
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
        const data = jwt.verify(token, "secret");
        if (!data) {
            return res.status(424).json("Invalid token");
        }
        const user = await User.findById(data.userId);
        res.json(user);
    } catch (error) {
        res.status(424).json(errorHandler(error));
    }
}

module.exports = {
    findAll,
    createUser,
    incrementScore,
    findAllByScore,
    login,
    register,
    currentUser
}

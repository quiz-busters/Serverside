const User = require('../models/User')
<<<<<<< HEAD

=======
>>>>>>> 46e0ffe73272b37c20df3058d5e8e9fbe05be437
const findAll = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users })
<<<<<<< HEAD

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

        if (req.body.score == 0) {
            res.send({ message: "Score is 0 - Do better next time" })
        } else {
            user.score += req.body.score
            res.json({ user: user.username, score: user.score, message: "Score updated" })
        }
        await user.save()

    } catch (error) {
        console.log('Cannot find score for this user')
        res.status(500).json({ error: error })
    }

}



=======
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
        if (req.body.score == 0) {
            res.send({ message: "Score is 0 - Do better next time" })
        } else {
            user.score += req.body.score
            res.json({ user: user.username, score: user.score, message: "Score updated" })
        }
        await user.save()
    } catch (error) {
        console.log('Cannot find score for this user')
        res.status(500).json({ error: error })
    }
}
>>>>>>> 46e0ffe73272b37c20df3058d5e8e9fbe05be437
module.exports = {
    findAll,
    createUser,
    incrementScore
<<<<<<< HEAD
}
=======
}
>>>>>>> 46e0ffe73272b37c20df3058d5e8e9fbe05be437

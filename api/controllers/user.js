const User = require('../models/User')

const findAll = async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json({users})

    } catch (error) {
        res.status(404).json({message: error})
    }
}

module.exports = {
    findAll
}
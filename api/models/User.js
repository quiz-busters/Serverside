const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        maxLength: [20, 'username length can be max 20 characters'],
        trim: true
    },
    score: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', UserSchema)
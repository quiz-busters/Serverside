const mongoose = require('mongoose');
const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please enter a name"],
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: [true, "Please enter a valid email"]
    },

    password: {
        type: String,
        required: [true, "Please enter a valid email"]
    },

    image: {
        type: String
    },
    
    score: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('User', UserSchema)

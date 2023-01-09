//This file contains all the schema that we want a user to have/know

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email '],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
},
//adds a time stamp field (created at, updated at)
{
    timestamps: true 
})  

module.exports = mongoose.model('User', userSchema)
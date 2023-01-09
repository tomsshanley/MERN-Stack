const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') //For password encryption
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')


//Function for Adding a user 
// @desc    Register a new user
// @route   GET /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res)=> {
    const {name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please complete all fields')
    }

    res.json({message: 'register user'})
})


//Authenticate a user
// @desc    Authenticate a user
// @route   GET /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
    res.json({message: 'Login user'})
})

//Get User data function -> Get the token for the current logged in user
// @desc    Get User data
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler( async (req, res) => {
    res.json({message: 'User data display'})
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
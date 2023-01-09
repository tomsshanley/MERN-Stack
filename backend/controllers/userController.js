const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') //For password encryption
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')


//Function for Adding a user 
// @desc    Register a new user
// @route   GET /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res)=> {
    //initialise fields coming from post request
    const {name, email, password } = req.body

    //check for all fields being full
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please complete all fields')
    }

    //Check if user exits
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }


    //hasing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    //check that user was created
    if(user) {
        // 201 Created resposne code
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})




//Authenticate a user
// @desc    Authenticate a user
// @route   GET /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
    //get email and password from body
    const {email, password} = req.body

    //check for user email in database
    const user = await User.findOne({email})

    //check user and password
    //do this by comparing the hashed password in the db and the password from body. bcrypt.compare can do this
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})

//Get User data function -> Get the token for the current logged in user
// @desc    Get User data
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler( async (req, res) => {
    res.json({message: 'User data display'})
})

// generate JWT
//signs a new token with the id passed in that will expire in 30 days
const generateToken = (id) => {
    return jwt.sign(
        {id}, 
        process.env.JWT_SECRET, 
        {expiresIn: '30d',}
    )
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
}
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async(req, res, next) => {
    let token

    //check for token, and that the token starts with 'Bearer' as it is a bearer token
    //the tokens are containted in the header of the JWT object
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header (use split and array location 1 as 'Bearer token' we just want the token)
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401) //not authorised
            throw new Error('not authorised')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('not authorised no token')
    }
})



module.exports = {protect}
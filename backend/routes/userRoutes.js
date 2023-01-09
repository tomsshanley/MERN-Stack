const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe} = require('../controllers/userController')

// adding a user with a posta request
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)


module.exports = router
const express = require('express')
const router = express.Router()
const { registerUser} = require('../controllers/userController')

// adding a user with a posta request
router.post('/', registerUser)


module.exports = router
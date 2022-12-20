const express = require('express')
const router = express.Router()

//example get request
router.get('/', (req, res) => {
    res.status(200).json({message: 'Get Goals'})
})

//post request
router.post('/', (req, res) => {
    res.status(200).json({message: 'Set Goals'})
})

//update request requires id
router.put('/:id', (req, res) => {
    res.status(200).json({message: `Update Goal ${req.params.id}`})
})

//delete reuqest
router.delete('/:id', (req, res) => {
    res.status(200).json({message: `delete Goal ${req.params.id}`})
})

module.exports = router
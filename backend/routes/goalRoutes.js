const express = require('express')
const router = express.Router()

//bring in some functions from the controllers to set as endpoints
const {getGoals, setGoals, updateGoals, deleteGoals} = require('../controllers/goalContoller')



//example get request
router.get('/', getGoals)

//post request
router.post('/', setGoals)

//the two above can be shortend to
// router.route('/').get(getGoals).post(setGoals)

//update request requires id
router.put('/:id', updateGoals)

//delete reuqest
router.delete('/:id', deleteGoals)

// the two above can be shortend to
// router.route('/:id').put(updateGoals).delete(deleteGoals)

module.exports = router
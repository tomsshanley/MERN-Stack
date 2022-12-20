//instead of adding functionality to requests in the body of the res.status.json
// we can do it here instead to make the code more better

//@desc Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = (req,res) => {
    res.status(200).json({message: 'Get Goals'})
}

//@desc Set goals
// @route   POST /api/goals
// @access  Private
const setGoals = (req,res) => {
    res.status(200).json({message: 'Set Goals'})
}

//@desc update goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoals = (req,res) => {
    res.status(200).json({message: `update Goal ${req.params.id}`})
}

//@desc delete goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoals = (req,res) => {
    res.status(200).json({message: `delete Goal ${req.params.id}`})
}


//make sure to export the functions
module.exports = {
    getGoals, 
    setGoals, 
    updateGoals, 
    deleteGoals,
}
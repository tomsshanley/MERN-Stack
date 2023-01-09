//instead of adding functionality to requests in the body of the res.status.json
// we can do it here instead to make the code more better

//error handler 
const asyncHandler = require('express-async-handler')

//pull in models
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req,res) => {

    //get goals from our database through the mongoose model "Goal" --------------finds specifc goal for logged in user
    const goals = await Goal.find({user: req.user.id})
    //------------------------------------

    res.status(200).json(goals)
})

//@desc Set goals
// @route   POST /api/goals
// @access  Private
const setGoals = asyncHandler(async (req,res) => {
    //error handling
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    //-------after error handling when get set goals with database
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

//@desc update goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoals = asyncHandler(async (req,res) => {

    //find goal by id
    const goal = await Goal.findById(req.params.id)

    //check if we have goal
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id) //get the logged in users id
    if (!user) {                                //if user does not exist
        res.status(401)
        throw new Error('User not found')
    }

    //Check that logged in user matches the user on the goal
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }


    //if goal exists, using mongodb findbyidandupdate and paramets, id, value, new
    //it will get the id, then put in the new text from request.body, if it is not there then 
    //make a new goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedGoal)
})

//@desc delete goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoals = asyncHandler(async (req,res) => {
    //find goal by id
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not Found')
    }

    const user = await User.findById(req.user.id) //get the logged in users id
    if (!user) {                                //if user does not exist
        res.status(401)
        throw new Error('User not found')
    }

    //Check that logged in user matches the user on the goal
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    //remove goal
    await goal.remove()

    res.status(200).json({id: req.params.id})
})


//make sure to export the functions
module.exports = {
    getGoals, 
    setGoals, 
    updateGoals, 
    deleteGoals,
}
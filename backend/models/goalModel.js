/*in the models folder we will basically define any resource we have
here is where we define our schema ie the fields for our particular resource*/

const mongoose = require('mongoose')            //bring in mongoose

const goalSchema = mongoose.Schema({            //set goalSchema to a mongosoe Schema
    //in here you define the fields
    //text obeject: with type of string and required value
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //reference object used as the .ObjectId needs to know where to point to
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true                        //used to create an "updated at" and "created at" field automatically
}) 


//export a ongoose model with the name goal and takes in goalSchema which we just made
module.exports = mongoose.model('Goal', goalSchema)

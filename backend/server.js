// requiring express (basically importing) as our backend framework
const express = require('express')
//importing dotenv. .config() is a function that makes a file to put our variables in it
const dotenv = require('dotenv').config() 
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000



//initialise express to variable 'app'
const app = express()

//adding middleware to use body data for POST requests
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//requiring routes folder so all the routes aren't in the server.js file
app.use('/api/goals', require('./routes/goalRoutes'))

//initialise errormiddlerware, overrides the defulat express errorhandler
app.use(errorHandler)

//call listen from app object
app.listen(port, () => console.log(`Server started on port ${port}`))
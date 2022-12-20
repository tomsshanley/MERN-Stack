// requiring express (basically importing) as our backend framework
const express = require('express')
//importing dotenv. .config() is a function that makes a file to put our variables in it
const dotenv = require('dotenv').config() 
const port = process.env.PORT || 5000



//initialise express to variable 'app'
const app = express()

//requiring routes folder so all the routes aren't in the server.js file
app.use('/api/goals', require('./routes/goalRoutes'))

//call listen from app object
app.listen(port, () => console.log(`Server started on port ${port}`))
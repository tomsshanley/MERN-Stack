//used to connect to mongodb 
//using mongoose
const mongoose = require('mongoose')


const connectDB = async () => {
    //use try catch statment
    try {
        //mongoose.connect with our database URI in variable 'conn'
        const conn = await mongoose.connect(process.env.MONGO_URI)

        //log to console, with variables connection.host indiffernet color and underlined
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    } catch(error) {
        //conolse log error
        console.log(error);
        //and exit with 1 (failure)
        process.exit(1)
    }
}

module.exports = connectDB
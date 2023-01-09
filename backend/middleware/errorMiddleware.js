// Middleware: A function that runs between the request and response cycle

//error handler, takes a status code given to it, if doesnot have one then server error 500
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    //set status code
    res.status(statusCode)

    //respond with json message, add stack trace if not in production
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}
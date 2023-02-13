const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    console.log(err);
    let customError = {
        statusCode: 500,
        message: 'Something went wrong, Plase try again later.'
    }
    // if email already registered,
    if(err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.message = 'Email already registered!'
    }
    if(err.name === "ValidationError") {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.message = Object.values(err.errors)[0].message;
    }
    res.
        status(customError.statusCode).
        json({ status: customError.statusCode, message: customError.message});
}

module.exports = errorHandler;
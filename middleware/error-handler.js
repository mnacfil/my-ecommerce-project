const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    console.log(err);
    let customError = {
        statusCode: err.status || 500,
        message: err.name || 'Something went wrong, Plase try again later.'
    }
    // if email already registered,
    if(err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        console.log(err);
        if(err.keyValue.mobilePhone) {
            customError.message = 'Mobile phone already registered!'
        }
        if(err.keyValue.user && err.keyValue.product) {
            customError.message = 'You already review this product.'
        }
        else {
            customError.message = 'Email already registered!'
        }
    }
    if(err.name === "ValidationError") {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.message = Object.values(err.errors).map(data => data.message);
    }
    if(err.name === 'CastError') {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.message = `No data found with id: ${err.value}`;
    }
    // res.json({err});
    res.
        status(customError.statusCode).
        json({ status: customError.statusCode, message: customError.message});
}

module.exports = errorHandler;
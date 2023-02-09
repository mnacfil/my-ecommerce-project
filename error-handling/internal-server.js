const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class InternalServerError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.status = StatusCodes.INTERNAL_SERVER_ERROR
    }
}

module.exports = InternalServerError;
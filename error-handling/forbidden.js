const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class Forbidden extends CustomAPIError {
    constructor(message) {
        super(message)
        this.status = StatusCodes.FORBIDDEN
    }
}

module.exports = Forbidden;
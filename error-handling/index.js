const BadRequest = require('./bad-request')
const Unauthorized = require('./unauthorized')
const Forbidden = require('./forbidden')
const NotFound = require('./not-found')
const InternalServerError = require('./internal-server')

module.exports = {
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    InternalServerError
}
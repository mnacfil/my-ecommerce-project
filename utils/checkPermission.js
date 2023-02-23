const { Unauthorized } = require('../error-handling')

const checkPermission = (requestor, resourceID) => {
    if(requestor.role === 'admin') return;
    if(requestor.userID === resourceID.toString()) return;
    throw new Unauthorized('You are not allowed to perform this thing.');
}

module.exports = checkPermission;
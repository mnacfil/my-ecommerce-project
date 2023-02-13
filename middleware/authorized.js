const Token = require('../model/Token');
const { isValidToken } = require('../utils');
const { Forbidden } = require('../error-handling')

const authenticateUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies;
    try {
        if(accessToken) {
            const payload = isValidToken(accessToken);
            req.user = payload.user;
            next();
            return;
        }
    } catch (error) {
        console.log(error);
    }
}

const authorizePermission = (...roles) => {
    return (req, res ,next) => {
        if(!roles.includes(req.user.role)) {
            throw new Forbidden('Unauthorized to access this resource');
        }
        next()
    }
}

module.exports = {
    authenticateUser,
    authorizePermission
}

// authorizePermissions
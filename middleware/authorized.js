const Token = require('../model/Token');
const { isValidToken } = require('../utils');
const { Forbidden, Unauthorized } = require('../error-handling');
const { attachCookiesToResponse } = require('../utils')

const authenticateUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies;
    try {
        if(accessToken) {
            const payload = isValidToken(accessToken);
            req.user = payload;
            next();
            return;
        }
        const payload = isValidToken(refreshToken);
        const existingToken = await Token.find({
            user: payload.user.userID,
            refreshToken: payload.refreshToken
        })
        // if existing token is expired or not valid
        if (!existingToken || !existingToken.isValid) {
            throw new Unauthorized('Authentication Invalid');
        }
        // generate new accessToken
        attachCookiesToResponse({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken
        });
        req.user = payload.user;
        next();
    } catch (error) {
        throw new Unauthorized('Authentication Invalid');
    }
}

const authorizePermission = (...roles) => {
    return (req, res ,next) => {
        if(!roles.includes(req.user.role)) {
            throw new Forbidden('Unauthorized to access this resource');
        }
        next();
    }
}

module.exports = {
    authenticateUser,
    authorizePermission
}

// authorizePermissions
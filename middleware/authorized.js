const Token = require('../model/Token');
const { isValidToken } = require('../utils')

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

// authorizePermissions
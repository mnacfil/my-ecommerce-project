const { createJWT, isValidToken, attachCookiesToResponse } = require('./jwt');
const sendEmailVerification = require('./email-verification/sendEmailVerification');

module.exports = {
    createJWT,
    isValidToken,
    attachCookiesToResponse,
    sendEmailVerification
};
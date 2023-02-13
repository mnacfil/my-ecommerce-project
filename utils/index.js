const { createJWT, isValidToken, attachCookiesToResponse } = require('./jwt');
const sendEmailVerification = require('./email-verification/sendEmailVerification');
const userResponseTemplate = require('./userResponseTemplate');

module.exports = {
    createJWT,
    isValidToken,
    attachCookiesToResponse,
    sendEmailVerification,
    userResponseTemplate
};
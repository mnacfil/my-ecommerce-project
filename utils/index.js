const { createJWT, isValidToken, attachCookiesToResponse } = require('./jwt');
const sendEmailVerification = require('./email-verification/sendEmailVerification');
const userResponseTemplate = require('./userResponseTemplate');
const sendAccountVerifiedEmail = require('./sendAccountVerifiedEmail');
const sendResetPasswordLinkEmail = require('./sendResetPasswordLinkEmail');
module.exports = {
    createJWT,
    isValidToken,
    attachCookiesToResponse,
    sendEmailVerification,
    userResponseTemplate,
    sendAccountVerifiedEmail,
    sendResetPasswordLinkEmail
};
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const crypto = require('crypto');
const {
    attachCookiesToResponse,
    sendEmailVerification
} = require('../utils');

// const {
//     BadRequest,
//     Unauthorized,
//     Forbidden,
//     NotFound,
//     InternalServerError
// } = require('../error-handling');

const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const verificationToken = crypto.randomBytes(40).toString('hex');
    const user = await User.create({ firstName, lastName, email, password, verificationToken });
    // attachCookiesToResponse()
    const origin = 'http://localhost:5000';
    await sendEmailVerification({
        origin,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        verificationToken: user.verificationToken
    });
    res.json({ status: 201, message: 'Success!, An email sent to your registered email to verify your account'});
}

const login = async (req, res) => {
    res.json({ status: 200, message: "LOGIN route"});
}

const logout = async (req, res) => {
    res.json({ status: 200, message: "LOGOUT route"});
}

const verifyEmail = async (req, res) => {
    res.json({ status: 200, message: "Verify email route"});
}

const resetPassword = async (req, res) => {
    res.json({ status: 200, message: "Reset Password route"});
}

const forgotPassword = async (req, res) => {
    res.json({ status: 200, message: "Forgot Password route"});
}

const myProfile = async (req, res) => {
    res.json({ status: 200, message: "My Profile route"});
}

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    resetPassword,
    forgotPassword,
    myProfile
}
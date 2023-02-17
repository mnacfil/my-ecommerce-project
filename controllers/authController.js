const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Token = require('../model/Token');
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes')
const {
    attachCookiesToResponse,
    sendEmailVerification,
    userResponseTemplate,
    sendAccountVerifiedEmail
} = require('../utils');

const {
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    InternalServerError
} = require('../error-handling');

const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const verificationToken = crypto.randomBytes(40).toString('hex');
    const user = await User.create({ firstName, lastName, email, password, verificationToken });
    const origin = 'http://localhost:5000';
    await sendEmailVerification({
        origin,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        verificationToken: user.verificationToken
    });
    res.json({
        status: StatusCodes.CREATED,
        message: 'Success!, An email sent to your registered email, Please go to your email to verify your account'});
}

const verifyEmail = async (req, res) => {
    const { email, verificationToken } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        throw new Unauthorized('Verification failed');
    }
    if(user.verificationToken !== verificationToken) {
        throw new Unauthorized('Verification failed');
    }
    user.isVerified = true;
    user.verificationDate = Date.now();
    user.verificationToken = '';
    await user.save();
    // Send Email saying that the account is verified.
    await sendAccountVerifiedEmail({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email
        });
    res.json({
        status: StatusCodes.OK,
        message: "Account verified, Please go to login"});
}

const login = async (req, res) => {
    const {email, password} = req.body;
    // throw error if email or password did not provide
    if(!email || !password) {
        throw new BadRequest('Plase fill out all field.')
    }
    const user = await User.findOne({ email });
    if(!user) {
        throw new Unauthorized('Invalid Credentials');
    }
    // throw error if password did not match to their registered account
    const isPasswordCorrect = await user.isPasswordMatch(password);
    if(!isPasswordCorrect) {
        throw new Unauthorized('Invalid Credentials');
    }
    // throw error if user is not yer verify their account
    if(!user.isVerified) {
        throw new Unauthorized('Please verify youre account first, before you login.')
    }
    // template for user,
    const userData = userResponseTemplate(user);
    // create refresh token, if the provided token expires
    let refreshToken = ''
    const existingToken = await Token.findOne({ user: user._id})
    if(existingToken) {
        // check if still valid
        if(!existingToken.isValid) {
            throw new Unauthorized('Invalid Credentials');
        }
        refreshToken = existingToken;
        attachCookiesToResponse({ res, user: userData, refreshToken});
        res.status(StatusCodes.OK).json({ userData });
        return;
    }
    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = { userAgent, ip, user: user._id, refreshToken };
    // create user Token
    await Token.create(userToken);
    // attach cookies to response
    attachCookiesToResponse({ res, user: userData, refreshToken });
    res.status(StatusCodes.OK).json({ userData });
}

const logout = async (req, res) => {
    const { accessToken, refreshToken } = req.signedCookies;

    res.clearCookie(accessToken, "Empty cookie", {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    res.clearCookie(refreshToken, "Empty cookie", {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    res.json({ status: 200, message: "User logged out"});
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
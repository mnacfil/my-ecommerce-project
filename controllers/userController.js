const jwt = require('jsonwebtoken');
const User = require('../model/User');

const {
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    InternalServerError
} = require('../error-handling');

const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password) {
        throw new BadRequest('Plase provide all field')
    }
    // const user = await User.create()
    res.json({ status: 200, message: "Register route"});
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
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const register = async (req, res) => {
    console.log(req.body);
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
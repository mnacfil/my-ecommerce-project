const express = require('express');
const router = express.Router();

// controllers for route
const {
    register,
    login,
    logout,
    verifyEmail,
    resetPassword,
    forgotPassword,
    myProfile
} = require('../controllers/authController');

// register
router.post('/register', register);
// login
router.post('/login', login);
// logout
router.post('/logout', logout);
// verify-email
router.post('/verify-email', verifyEmail);
// reset-password
router.post('/reset-password', resetPassword);
// forgot-password
router.post('/forgot-password', forgotPassword);
// my-profile
router.get('/my-profile', myProfile);

module.exports = router;
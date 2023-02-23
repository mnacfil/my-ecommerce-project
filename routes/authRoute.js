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
} = require('../controllers/authController');
const {
    authenticateUser,
    authorizePermission
} = require('../middleware/authorized');

// register
router.post('/register', register);
// login
router.post('/login', login);
// verify-email
router.post('/verify-email',  verifyEmail);
// logout
router.delete('/logout', authenticateUser, logout);
// reset-password
router.post('/reset-password',authenticateUser,  resetPassword);
// forgot-password
router.post('/forgot-password',authenticateUser,  forgotPassword);

module.exports = router;
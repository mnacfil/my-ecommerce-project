const express = require('express');
const router = express.Router();

// controllers
const {
    myProfile,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// middleware
const { authenticateUser, authorizePermission } = require('../middleware/authorized');

router.get('/', authenticateUser, authorizePermission('admin'),  getAllUser);

router.get('/my-profile', authenticateUser, myProfile);

router.route('/:id').
    get( authenticateUser,getUser).
    patch(authenticateUser, updateUser).
    delete(authenticateUser, deleteUser);

module.exports = router
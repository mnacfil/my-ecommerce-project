const express = require('express');
const router = express.Router();

const { authenticateUser, authorizePermission } = require('../middleware/authorized');

const {
    createReview,
    getAllReview,
    getReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

router.post('/create-review', authenticateUser, createReview);
router.get('/', authenticateUser, getAllReview);
router.route('/:id').
        get(authenticateUser, getReview).
        patch(authenticateUser, updateReview).
        delete(authenticateUser, deleteReview);

module.exports = router;
const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authorized')

const {
    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductByAdmin
} = require('../controllers/productController')

router.route('/').get( authenticateUser, getAllProduct)
router.get('/our-products', authenticateUser, getAllProductByAdmin);
router.post('/create-product', [authenticateUser, createProduct]);
router.route('/:id').
    get(authenticateUser, getProduct).
    patch(authenticateUser, updateProduct).
    delete(authenticateUser, deleteProduct);

module.exports = router;
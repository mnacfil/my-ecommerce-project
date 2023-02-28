const Product = require('../model/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, Unauthorized, NotFound } = require('../error-handling');

// Where all buyer can see
const getAllProduct = async(req, res) => {
    const products = await Product.find({}).populate({
        path: 'user',
        select: 'firstName lastName'
    }).populate({
        path: 'productReviews',
        select: 'rating message'
    });
    res.status(StatusCodes.OK).json({ products })
}

// Where only admin of particular company can see
const getAllProductByAdmin = async(req, res) => {
    const products = await Product.find({ user: req.user.userID });
    res.status(StatusCodes.OK).json({ products });
}

const createProduct = async(req, res) => {
    req.body.user = req.user.userID;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product});
}

const getProduct = async(req, res) => {
    const product = await Product.findOne({ _id: req.params.id});
    if(!product) {
        throw new NotFound(`No product found with id: ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ status: StatusCodes.OK, product });
}

const updateProduct = async(req, res) => {
    const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, {
        runValidators: true,
        new: true
    })
    if(!product) {
        throw new NotFound(`No product found with id: ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: "Succesfully updated", product });
}

const deleteProduct = async(req, res) => {
    const product = await Product.findOne({_id: req.params.id})
    if(!product) {
        throw new NotFound(`No product found with id: ${req.params.id}`);
    }
    await product.remove();
    res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: "Succesfully deleted"});
}


module.exports = {
    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductByAdmin
}

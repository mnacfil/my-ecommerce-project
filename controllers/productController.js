const Product = require('../model/Product');

const getAllProduct = async(req, res) => {
    res.json({ status: 200, message: "get all product route"});
}

const createProduct = async(req, res) => {
    res.json({ status: 200, message: "create product route"});
}


const getProduct = async(req, res) => {
    res.json({ status: 200, message: "get product route"});
}

const updateProduct = async(req, res) => {
    res.json({ status: 200, message: "update product route"});
}

const deleteProduct = async(req, res) => {
    res.json({ status: 200, message: "delete product route"});
}


module.exports = {
    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

const Review = require('../model/Review');
const { StatusCodes } = require('http-status-codes');
const { checkPermission } = require('../utils');
const { BadRequest } = require('../error-handling');

const createReview = async (req, res) => {
    req.body.user = req.user.userID;

    const userReview = await Review.findOne({ user: req.user.userID, product: req.body.product})
    // if user already review the product
    if(userReview) {
        throw new BadRequest('You already review this product, you cannot make another review for this product. You can only edit it or delete it and make a new one.');
    }

    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({status: StatusCodes.CREATED, review});
}

const getAllReview = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'get all review'});
}

const getReview = async (req, res) => {
    // get all review per product
    const reviews = await Review.find({ product: req.params.id }).populate({
        path: 'users',
        select: 'firstName lastName'
    });
    res.status(StatusCodes.OK).json({reviews});
}

const updateReview = async (req, res) => {
    const { message, rating} = req.body;
    const review = await Review.findOne({user: req.user.userID, product: req.params.id });
    // only the user who created the review can update and admin (if review is has sexual context)
    if(!review) {
        throw new BadRequest('You have no review to update');
    }
    checkPermission(req.user, review.user);
    review.message = message;
    review.rating = rating;
    await review.save();
    res.status(StatusCodes.OK).json({status: StatusCodes.OK, message: 'Update Succesfully', review});
}

const deleteReview = async (req, res) => {
    const review = await Review.findOne({user: req.user.userID, product: req.params.id });
    checkPermission(req.user, review.user);
    await review.remove();
    res.status(StatusCodes.OK).json({status: StatusCodes.OK, message: 'Deleted Succesfully'});
}

module.exports = {
    createReview,
    getAllReview,
    getReview,
    updateReview,
    deleteReview
}
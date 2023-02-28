const Review = require('../model/Review');
const { StatusCodes } = require('http-status-codes');

const createReview = async (req, res) => {
    req.body.user = req.user.userID;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({status: StatusCodes.CREATED, review});
}

const getAllReview = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'get all review'});
}

const getReview = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'get review'});
}

const updateReview = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'update review'});
}

const deleteReview = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'delete review'});
}

module.exports = {
    createReview,
    getAllReview,
    getReview,
    updateReview,
    deleteReview
}
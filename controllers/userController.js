const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const { NotFound, BadRequest } = require('../error-handling');
const { checkPermission } = require('../utils');
const myProfile = async (req, res) => {
    const { userID } = req.user;
    const user = await User.findOne({ _id: userID }).select('firstName lastName role email');

    res.
        status(StatusCodes.OK).
        json({ status: StatusCodes.OK, user });
}

const getAllUser = async (req, res) => {
    const users = await User.find({}).select('firstName lastName role email');
    res.
    status(StatusCodes.OK).
    json({ status: StatusCodes.OK, users });
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select('firstName lastName role email');
    if(!user){
        throw new NotFound(`No user found.`);
    }
    res.
    status(StatusCodes.OK).
    json({ status: StatusCodes.OK, user });
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    checkPermission(req.user, id);
    const { firstName, lastName, email, mobilePhone, role} = req.body;
    if(!firstName || !lastName || !email || !mobilePhone) {
        throw new BadRequest('Please provid all field');
    }
    const user = await User.findOne({ _id: id }).select('firstName lastName role email');
    if(!user){
        throw new NotFound(`No user found.`);
    }
    if(req.user.role === 'admin') {
        user.role = role;
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.mobilePhone = mobilePhone;

    await user.save();

    res.
    status(StatusCodes.OK).
    json({ status: StatusCodes.OK, user });
}

const deleteUser = async (req, res) => {
    const deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
    console.log(deleteUser);
    res.json({ status: StatusCodes.OK, message: "Deleted succesfully."});
}

module.exports = {
    myProfile,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
}
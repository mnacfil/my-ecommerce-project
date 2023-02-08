const mongoose = require('mongoose');

const connectToDb = async (url) => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(url);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDb;
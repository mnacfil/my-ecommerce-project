require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// initialize application
const app = express();

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

// db
const connectToDb = require('./db/connectToDb');

// routes
const {authRoute, userRoute} = require('./routes');

// middleware
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser(process.env.SECRET));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);

app.get('/api/v1', (req, res) => {
    const { accessToken, refreshToken } = req.signedCookies;
    console.log(accessToken);
    res.send('hello world');
})

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || '5000';

const startTheServer = async () => {
    try {
        await connectToDb(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

startTheServer();

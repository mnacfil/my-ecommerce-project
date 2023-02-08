require('dotenv').config();
require('express-async-errors');

const express = require('express');

// initialize application
const app = express();

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

// db
const connectToDb = require('./db/connectToDb');

// routes
const userRoutes = require('./routes/route');

// middleware
app.use(express.json());
app.use('/api/v1', userRoutes);

app.get('/', (req, res) => {
    res.send('hello world')
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

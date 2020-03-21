require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const routes = require('./routes');

async function startServer() {

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        authSource: 'admin'
    });

    routes(app);

    app.listen(process.env.PORT, () => {
        console.log(`Started server on port : ${process.env.PORT} ...`);
    });
}

startServer().then();


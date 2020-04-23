require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const routes = require('./routes');

async function startServer() {
    try {
        console.log(`Trying to connect to mongoDB : ${process.env.MONGO_URI} ...`);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            authSource: 'admin'
        });

        console.log(`Connection successful to mongoDB`);

        app.use(cors());

        routes(app);

        app.listen(process.env.PORT, () => {
            console.log(`Started server on port : ${process.env.PORT} ...`);
        });
    }catch (e) {
        console.log(`Server error : ${e.message}`);
    }
}

startServer().then();


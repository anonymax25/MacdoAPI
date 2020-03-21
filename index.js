require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const routes = require('./routes');

async function boostrap() {

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        auth: {
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS
        },
        authSource: 'admin'
    });

    routes(app);

    app.listen(process.env.PORT, () => {
        console.log(`Started server on port : ${process.env.PORT} ...`);
    });
}

boostrap().then();

/**
 const u1 = await User.create({
        login: 'louis95',
        password: 'blablou',
        email: 'oui'
    });
 console.log(u1);
 const s1 = await Session.create({
        token: "zeufhizuehfiuzehfkzef",
    });
 await s1.setUser(user);

 const sessions = await user.getSessions();
 console.log(JSON.stringify(sessions));

 const user = await User.findOne({
        include: [{
            model: Session,
            where: {
                token: 'zeufhizuehfiuzehfkzef'
            }
        }]
    });
 console.log(JSON.stringify(user))
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const { getUserById } = require('../db');

const { 
    createUser,
    getUserByUsername
} = require('../db');

// set 'req.user' if possible
usersRouter.use(async (req, res, next) => {
    console.log("Beginning token verification")
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) { // nothing to see here
        console.log("!!!! !auth !!!!")
        next();
    } else if (auth.startsWith(prefix)) {
        console.log("Generating token")
        const token = auth.slice(prefix.length);

        try {
            console.log("Verifying token")
            const { id } = jwt.verify(token, process.env.JWT_SECRET);

            if (id) {
                console.log("id: " + id)
                req.user = await getUserById(id);
                console.log("req.user: " + req.user);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});
// health check
usersRouter.use((req, res, next) => {
    if (req.user) {
        console.log("User is set:", req.user);
    }
    next();
});

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    try{
        const userReg = await createUser({
            username,
            password
        });

        const token = jwt.sign({ 
            id: userReg.id, 
            username
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: "Thanks for for signing up",
            token
        });

        console.log(token);
    } catch ({ name, message }) {
        next({ name, message })
    } 
});

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {

    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try {
        const user = await getUserByUsername(username);
    
        if (user && user.password == password) {
            // create token & return to user
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.send({ message: "you're logged in!" , token: `${ token }`});
            console.log(token);
        } else {
            next({ 
                name: 'IncorrectCredentialsError', 
                message: 'Username or password is incorrect'
            });
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});
// GET /api/users/me
usersRouter.post('/me', async (req, res, next) => {
    // const { username, password } = req.body;
    // try{
    //     const _user = await getUser();

    //     if (_user) {
    //         console.log(_user);
    //     } else {
    //         next({
    //             name: 'DidNotGetMe',
    //             message: 'Something went wrong...'
    //         });
    //     }
    // } catch(error) {
    //     console.log(error);
    //     next(error);
    // }
});

// GET /api/users/:username/routines

module.exports = usersRouter;

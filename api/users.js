/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const { 
    createUser
} = require('../db');

// health check
usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
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

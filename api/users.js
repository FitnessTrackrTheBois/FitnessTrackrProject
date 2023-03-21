/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();

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

    res.send({
        message: "thank you for signing up",
    });
    } catch ({ name, message }) {
        next({ name, message })
    } 
});

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = usersRouter;

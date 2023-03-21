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
usersRouter.post('/register', async (req, res) => {
    const usersReg = await createUser();

    res.send({
        usersReg
    });
});

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = usersRouter;

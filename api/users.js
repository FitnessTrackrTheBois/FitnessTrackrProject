const express = require("express");
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const bcrypt = require("bcrypt");


const { 
    createUser,
    getUserByUsername,
    getUserById
} = require('../db');

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const _user = await getUserByUsername(username);
        if (_user) {
            res.send({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        // } else if(_user.password.length < 8) {
        //     res.send({
        //         name: "PasswordTooShort",
        //         message: "Password must be a minimum of 8 characters."
        //     });
        } else {
            const user = await createUser({
                username,
                password
            });
                if (user.id) {
                    const token = jwt.sign({ 
                        id: user.id, 
                        username
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1w'
                    }); res.send({ 
                        message: "thank you for signing up",
                        token 
                    })};
            };
        } catch (error) {
            throw(error);
        };
});

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try {
        const user = await getUserByUsername(username);

        const comparePass = await bcrypt.compare(password, user.password); 
        if (user && comparePass) {
            
            const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: "1w" });

            res.send({ 
                user: {
                    id: user.id,
                    username: user.username
                },
                message: 'Login successful',
                token: token
            });
            
        } else {
            next({ 
                name: 'IncorrectCredentialsError', 
                message: 'Username or password is incorrect'
            });
        }
    } catch(error) {
        console.log(error);
        return next(error);
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
usersRouter.post('/searchid', async (req, res, next) => {
    try {
      const { id } = req.body;
      const user = await getUserById({ id });
  
      if (user) {
        res.send(user);
      } else {
        throw { name: 'UserNotFoundError', message: 'User not found' };
      }
    } catch(error) {
      next(error);
    }
  });
// GET /api/users/:username/routines
module.exports = usersRouter;

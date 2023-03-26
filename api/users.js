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


// usersRouter.use(async (req, res, next) => {
//     console.log("Beginning token verification")
//     const prefix = 'Bearer ';
//     const auth = req.header('Authorization');

//     if (!auth) { 
//         console.log("!!!! !auth !!!!")
//         next();
//     } else if (auth.startsWith(prefix)) {
//         console.log("Generating token")
//         const token = auth.slice(prefix.length);

//         try {
//             console.log("Verifying token")
//             const { id } = jwt.verify(token, process.env.JWT_SECRET);

//             if (id) {
//                 console.log("id: " + id)
//                 req.user = await getUserById(id);
//                 console.log("req.user: " + req.user);
//                 next();
//             }
//         } catch ({ name, message }) {
//             next({ name, message });
//         }
//     } else {
//         next({
//             name: 'AuthorizationHeaderError',
//             message: `Authorization token must start with ${ prefix }`
//         });
//     }
// });

// // health check
// usersRouter.use((req, res, next) => {
//     if (req.user) {
//         console.log("User is set:", req.user);
//     }
//     next();
// });

// POST /api/users/register
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

        // if (!user || !(await bcrypt.compare(password, user.password))) {
        //     return res.status(401).json({
        //         message: 'Incorrect username or password'
        //     });
        // } else {

        if (user && user.password == password) {
            // create token & return to user
            
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        
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

        // }
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

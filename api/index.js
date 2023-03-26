/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { token } = require('morgan');

const bcrypt = require("bcrypt");


// router.use(async (req, res, next) => {
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

// GET /api/health
router.get('/health', async (req, res, next) => {
    console.log("Request Received")
    next();
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
router.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
router.use('/routine_activities', routineActivitiesRouter);

router.use((error, req, res, next) => {
    res.send({
        name: error.name,
        message: error.message
    });
});

module.exports = router;

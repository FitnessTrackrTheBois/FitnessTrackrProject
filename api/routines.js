/* eslint-disable no-unused-vars */
const express = require('express');
const routinesRouter = express.Router();

const { 
    createRoutine,
    getRoutinesWithoutActivities
} = require('../db');

// health check
routinesRouter.use((req, res, next) => {
    console.log("A request is being made to /routines");
    next();
});

// GET /api/routines
routinesRouter.get('/', async (req, res) => {
    const routinesData = await getRoutinesWithoutActivities();

    res.send({
        routinesData
    });
});

// POST /api/routines
routinesRouter.post('/', async (req, res, next) => {
    const { name, goal } = req.body;
    try{
        const routinesCreate = await createRoutine({
            name,
            goal
        });

        res.send({
            message: "Routine Successfully Created",
        });
    } catch ({ name, message }) {
        next({ name, message })
    } 
});

// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;

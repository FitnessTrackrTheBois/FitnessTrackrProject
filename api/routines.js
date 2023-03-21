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
routinesRouter.post('/', async (req, res) => {
    const routinesCreate = await createRoutine();

    res.send({
        routinesCreate
    });
});

// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;

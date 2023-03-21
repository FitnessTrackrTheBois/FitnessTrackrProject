const express = require('express');
const activitiesRouter = express.Router();

const { 
    createActivity,
    getAllActivities
} = require('../db');

// health check
activitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /activities");
    next();
});

// GET /api/activities/:activityId/routines

// GET /api/activities
activitiesRouter.get('/', async (req, res) => {
    const activitiesData = await getAllActivities();

    res.send({
        activitiesData
    });
});

// POST /api/activities
activitiesRouter.post('/', async (req, res) => {
    const activitiesCreate = await createActivity();

    res.send({
        activitiesCreate
    });
});

// PATCH /api/activities/:activityId

module.exports = activitiesRouter;


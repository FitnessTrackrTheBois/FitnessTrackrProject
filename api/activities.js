/* eslint-disable no-unused-vars */
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
activitiesRouter.post('/', async (req, res, next) => {
    const { name, description } = req.body;
    try{
        const activitiesCreate = await createActivity({
            name,
            description
        });

        res.send({
            message: "Activity Successfully Created",
        });
    } catch ({ name, message }) {
        next({ name, message })
    } 
});

// PATCH /api/activities/:activityId

module.exports = activitiesRouter;


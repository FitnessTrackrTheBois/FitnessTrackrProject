/* eslint-disable no-unused-vars */
const express = require('express');
const activitiesRouter = express.Router();

const { 
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity
} = require('../db');

// health check
activitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /activities");
    next();
});

// GET /api/activities/:activityId/routines
activitiesRouter.get('/:activityId', async (req, res) => {
    const activities = await getActivityById(req.params.activityId);

    res.send(
        activities
    );
});

// GET /api/activities
activitiesRouter.get('/', async (req, res) => {
    const activitiesData = await getAllActivities();

    res.send(
        activitiesData
    );
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

activitiesRouter.patch('/:activityId', async (req, res, next) => {
    const id = req.params.activityId;
    console.log(id);
    const { name, description  } = req.body;

    console.log(name);
    console.log(description);
    const updateFields = {};

    if (name) {
        updateFields.name = name;
    }

    if (description) {
        updateFields.description = description;
    }

    // Good up until here
    try {
        // Not used, saving for later
        // const originalActivity = await getActivityById(id);
        
        const updatedActivity = await updateActivity({id, fields: updateFields});
        console.log("Updated activity: " + updatedActivity);
        res.send(updatedActivity);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// PATCH /api/activities/:activityId

module.exports = activitiesRouter;


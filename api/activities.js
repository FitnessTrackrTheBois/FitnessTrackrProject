/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const activitiesRouter = express.Router();

const { 
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    getActivityByName
} = require('../db');

// GET /api/activities/name
// activitiesRouter.get('/name', async (req, res, next) => {
//     const { name } = req.body;

//     if (!name) {
//         next({
//         name: "ActivityNameError",
//         message: "Please supply valid activity name"
//         });
//     }
//     try{
//         const activitiesData = await getActivityByName(name);
//         console.log("activitiesData : " + activitiesData);
//         res.send(
//             activitiesData
//         );
//     } catch(error) {
//         console.log(error);
//         next(error);
//     }
// });

// NEEDS /routines !!!!!!!!!!!!!!!
// GET /api/activities/:activityId/routines
activitiesRouter.get('/:activityId', async (req, res, next) => {
    const activities = await getActivityById(req.params.activityId);
    if(!req.params.activityId){
        console.log(error);
        next(error);
    }
    try{
        res.send(
            activities
        );
    } catch(error) {
        console.log(error);
        next(error);
    }
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

// PATCH /api/activities/:activityId
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

    try {
        const updatedActivity = await updateActivity({id, fields: updateFields});
        console.log("Updated activity: " + updatedActivity);
        res.send(updatedActivity);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = activitiesRouter;


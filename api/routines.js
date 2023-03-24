/* eslint-disable no-unused-vars */

const express = require('express');
const routinesRouter = express.Router();

const { requireUser } = require('./utils');

const { 
    createRoutine,
    getAllRoutines,
    getAllPublicRoutines,
    getRoutinesWithoutActivities,
    getRoutineById,
    updateR0outine,
    destroyRoutine
} = require('../db');

// GET /api/routines
// This guy is used a lot for testing various "getRoutines" methods for now.
routinesRouter.get('/', async (req, res) => {
    // const routinesData = await getRoutinesWithoutActivities();
    // const routinesData = await getAllRoutines();
    const routinesData = await getAllPublicRoutines();

    res.send(
        routinesData
    );
});

// POST /api/routines
routinesRouter.post('/', async (req, res, next) => {
    const { isPublic, name, goal } = req.body;
    const routineData = {};

    // if(req.user){
    //     routineData.creatorId = req.user.id;
    // }

// Testing Method
    let creatorId = 1;
// Testing Method    
    try{
        const routinesCreate = await createRoutine({
            creatorId,
            isPublic,
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
routinesRouter.patch('/:routineId', async (req, res, next) => {
    const id = req.params.routineId;
    console.log(id);
    const { isPublic, name, goal  } = req.body;

    const updateFields = {};

    if (isPublic) {
        updateFields.isPublic = isPublic;
    }

    if (name) {
        updateFields.name = name;
    }

    if (goal) {
        updateFields.goal = goal;
    }

    try {
        // const originalRoutine = await getRoutineById(id);
        
        // if (originalRoutine.creatorId.id === req.user.id) {
        
        //     const updatedRoutine = await updatedRoutine(id, updateFields);
        
        //     res.send({ routine: updatedRoutine })
        const updatedRoutine = await updateRoutine({id, fields: updateFields});

        console.log("Updated activity: " + updatedRoutine);

        res.send(updatedRoutine);
        
        // } else {
        //     next({
        //         name: 'UnauthorizedUserError',
        //         message: 'You cannot update a routine that is not yours'
        //     })
        // }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// DELETE /api/routines/:routineId
routinesRouter.delete('/:routineId', async (req, res, next) => {
    try{
        const deleteRoutineData = await destroyRoutine(req.params.id);
        res.send(deleteRoutineData)

    } catch(error){
        console.log(error)
    }
});

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;

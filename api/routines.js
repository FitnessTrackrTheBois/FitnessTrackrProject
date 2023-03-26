/* eslint-disable no-unused-vars */

const express = require('express');
const routinesRouter = express.Router();

const { requireUser } = require('./utils');

const { 
    createRoutine,
    getAllRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByActivity,
    getPublicRoutinesByUser,
    getAllPublicRoutines,
    getRoutinesWithoutActivities,
    getRoutineById,
    updateRoutine,
    destroyRoutine
} = require('../db');

// GET /api/routines
// This guy is used a lot for testing various "getRoutines" methods for now.
routinesRouter.get('/', async (req, res) => {
    // const routinesData = await getRoutinesWithoutActivities();
    // const routinesData = await getAllRoutines();
    // const routinesData = await getAllPublicRoutines();
    
    // const routinesData = await getAllRoutinesByUser({ username: "glamgal"});
    // const routinesData = await getPublicRoutinesByUser({ username: "glamgal"});
    const routinesData = await getPublicRoutinesByActivity({id: 7})
    
    res.send(
        routinesData
    );
});

// THIS IS MEANT FOR TESTING getRoutineById
// GET /api/routines/:routineId/
routinesRouter.get('/:routineId', async (req, res) => {
    // const routinesData = await getRoutinesWithoutActivities();
    // const routinesData = await getAllRoutines();
    // const routinesData = await getAllPublicRoutines();
    const routines = await getRoutineById(req.params.routineId);
    
    if(!req.params.routineId){
        console.log(error);
        next(error);
    }
    try{
        res.send(
            routines
        );
    } catch(error) {
        console.log(error);
        next(error);
    }
});

// Creates a routine
// This works, but right now it hard-codes the creatorId to Albert; 
// It doesn't work on ANY "given" creatorId...
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

// Successfully updates a routine.
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
        const deleteRoutineData = await destroyRoutine(req.params.routineId);
        res.send(deleteRoutineData)

    } catch(error){
        console.log(error)
    }
});

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;

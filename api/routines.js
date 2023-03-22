/* eslint-disable no-unused-vars */

const express = require('express');
const routinesRouter = express.Router();

const { 
    createRoutine,
    getRoutinesWithoutActivities,
    getRoutineById,
    updateRoutine,
    destroyRoutine
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
    const { isPublic, name, goal } = req.body;
    try{
        const routinesCreate = await createRoutine({
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
    const { id } = req.params;
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
        const originalRoutine = await getRoutineById(id);
        
        if (originalRoutine.creatorId.id === req.user.id) {
        
            const updatedRoutine = await updatedRoutine(id, updateFields);
        
            res.send({ routine: updatedRoutine })
        
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot update a routine that is not yours'
            })
        }
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

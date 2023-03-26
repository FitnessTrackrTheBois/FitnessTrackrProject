const express = require('express');
const routineActivitiesRouter = express.Router();

const { 
    getRoutineActivityById,
    getRoutineActivitiesByRoutine,
    updateRoutineActivity,
    destroyRoutineActivity
} = require('../db');

// PATCH /api/routine_activities/:routineActivityId

// DELETE /api/routine_activities/:routineActivityId

// THIS IS MEANT FOR TESTING routineActivites
// GET /api/routine_activities/:routineActivityId/
routineActivitiesRouter.get('/:routineActivityId', async (req, res) => {
    // const routineActivity = await getRoutineActivityById(req.params.routineActivityId);
    const routineActivity = await getRoutineActivitiesByRoutine({ id : req.params.routineActivityId});
    
    if(!req.params.routineActivityId){
        console.log(error);
        next(error);
    }
    try{
        res.send(
            routineActivity
        );
    } catch(error) {
        console.log(error);
        next(error);
    }
});

// THIS IS MEANT FOR TESTING routineActivites 
// PATCH /api/routine_activities/:routineActivityId/
routineActivitiesRouter.patch('/:routineActivityId', async (req, res) => {
    const id = req.params.routineActivityId;
    console.log(id);
    const { newId, count, duration } = req.body;

    const updateFields = {};

    if (newId) {
        updateFields.id = newId;
    }

    if (count) {
        updateFields.count = count;
    }

    if (duration) {
        updateFields.duration = duration;
    }

    try {
        // const originalRoutine = await getRoutineById(id);
        
        // if (originalRoutine.creatorId.id === req.user.id) {
        
        //     const updatedRoutine = await updatedRoutine(id, updateFields);
        
        //     res.send({ routine: updatedRoutine })
        const updatedRoutineActivity = await updateRoutineActivity({id, fields: updateFields});

        console.log("Updated routine activity: " + updatedRoutineActivity);

        res.send(updatedRoutineActivity);
        
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

// THIS IS MEANT FOR TESTING deleteRoutineActivity
// DELETE /api/routine_activities/:routineActivityId/
routineActivitiesRouter.delete('/:routineId', async (req, res, next) => {
    try{
        const deleteRoutineActivityData = await destroyRoutineActivity(req.params.routineId);
        res.send(deleteRoutineActivityData)

    } catch(error){
        console.log(error)
    }
});

module.exports = routineActivitiesRouter;

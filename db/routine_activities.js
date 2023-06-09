/* eslint-disable no-unused-vars */
const client = require("./client");

async function addActivityToRoutine({routineId, activityId, count, duration}){
  try {
      console.log("starting addActivityToRoutine");
    const { rows: [ routine_activity ] } = await client.query(`
        INSERT INTO routine_activities("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        
    `, [routineId, activityId, count, duration]);

      console.log("finished addActivityToRoutine");

    return routine_activity;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getRoutineActivityById(id) {}

async function getRoutineActivitiesByRoutine({ id }) {}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};

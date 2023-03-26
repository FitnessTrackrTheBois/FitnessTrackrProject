/* eslint-disable no-unused-vars */
const client = require("./client");

// Adds an activity to a routine.
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

// Returns an activity object when given an id
async function getRoutineActivityById(id) {
  try {
    console.log("Starting getRoutineActivityById");
  const { rows: [ routine_activity ]  } = await client.query(`
      SELECT * FROM routine_activities
      WHERE id=$1;
  `, [id]);
    console.log("finished getRoutineActivityById");

    console.log(routine_activity);
    return routine_activity;

  } catch (error) {
      console.log(error);
      throw error;
  }
}

// Gets the activities from a routine when given a routine id.
async function getRoutineActivitiesByRoutine({ id }) {
  try {
    console.log("Starting getRoutineActivitiesByRoutine");

    const { rows : activities } = await client.query(`
      SELECT activities.id, activities.name, activities.description,
      routine_activities.count, routine_activities.duration
      FROM routine_activities
      JOIN activities ON routine_activities."activityId" = activities.id
      WHERE routine_activities."routineId" = $1;
    `, [id]);
  
    console.log("Finished getRoutineActivitiesByRoutine")

    return activities;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Based off of updateRoutine from db/routines.js
async function updateRoutineActivity({ id, fields = {} }) {
  console.log("Starting updateRoutineActivity");

  const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  try {
      if(setString.length > 0){ 
          await client.query(`
              UPDATE routine_activities
              SET ${ setString }
              WHERE id=${ id }
              RETURNING *;
          `, Object.values(fields));
      }
        console.log("finished updateRoutineActivities");
      return await getRoutineActivityById(id);

  } catch (error) {
      console.log(error);
      throw error;
  }
}

// Based off of destroyRoutine
// If it isn't necessary to return the deleted object,
// just remove "RETURNING *" from the SQL.
async function destroyRoutineActivity(id) {
  console.log("Starting destroyRoutineActivityID");
  try {

    // delete the routine activities associated with this routine
    const { rows: [deletedRoutineActivity] } = await client.query(`
      DELETE FROM routine_activities
      WHERE id = $1
      RETURNING *;
    `, [id]);


    console.log("Finishing destroyRoutineActivityID");

    return deletedRoutineActivity;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

// Apparently, this function isn't necesssary..
async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};

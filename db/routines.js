/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
      console.log("starting createRoutine");
    const { rows: [ routine ] } = await client.query(`
        INSERT INTO routines("creatorId", "isPublic", name, goal)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `, [creatorId, isPublic, name, goal]);

      console.log("finished createRoutine");
    return routine;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getRoutineById(id) {
  try {
      console.log("Starting getRoutineById");
    const { rows: [ routine ]  } = await client.query(`
        SELECT * FROM routines
        WHERE id = $1;
    `, [id]);
      console.log("finished getRoutineById");
      return routine;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try{
    const { rows } = await client.query(`
    SELECT id, "creatorId", "isPublic", name, goal
    FROM routines;
    `);
    return rows;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function getAllRoutines() {
  // let exampleRoutine = 2;
  try{
    console.log("Starting getAllRoutines");
    const { rows } = await client.query(`
    SELECT routine.id, routine."creatorId", routine."isPublic", routine.name, routine.goal, routine_activity."activityId", routine_activity.count, routine_activity.duration,
    activity.name AS "activityName",
    activity.description AS "activityDescription"
    FROM routines routine
    JOIN routine_activities routine_activity ON routine.id = routine_activity."routineId"
    JOIN activities activity ON routine_activity."activityId" = activity.id;
    `);

    const routinesData = rows.map((row) => ({
        id: row.id,
        creatorId: row.creatorId,
        isPublic: row.isPublic,
        name: row.name,
        goal: row.goal,
        activity: {
          id: row.activityId,
          name: row.activityName,
          description: row.activityDescription,
          count: row.count,
          duration: row.duration,
        },
    }));
    
    console.log("finished getAllRoutines");
    return routinesData;
    // return rows;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    console.log("Starting getAllPublicRoutines");
    const { rows } = await client.query(`
      SELECT * FROM routines
      WHERE "isPublic" = true;
    `);
    // const { rows } = await client.query(`
    //   SELECT routine.id, routine."creatorId", routine."isPublic", routine.name, routine.goal, routine_activity."activityId", routine_activity.count, routine_activity.duration,
    //   WHERE "isPublic" = true,
    //   activity.name AS "activityName",
    //   activity.description AS "activityDescription"
    //   FROM routines routine
    //   JOIN routine_activities routine_activity ON routine.id = routine_activity."routineId"
    //   JOIN activities activity ON routine_activity."activityId" = activity.id;
    // `);
    console.log("finished getAllPublicRoutines");
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, fields = {} }) {
  console.log("Starting updateRoutine");

  const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  try {
      if(setString.length > 0){ 
          await client.query(`
              UPDATE routines
              SET ${ setString }
              WHERE id=${ id }
              RETURNING *;
          `, Object.values(fields));
      }
        console.log("finished updateRoutine");
      return await getRoutineById(id);

  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function destroyRoutine(id) {
  console.log("Starting destroyRoutineID");
  try{
      const deleteRoutine = getRoutineById(id)

      await client.query(`
          DELETE FROM routines
          WHERE id = $1;
      `, [id])

      console.log("Finishing destroyRoutineID");

      return deleteRoutine;

  } catch(error){
      console.error(error);
      throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};

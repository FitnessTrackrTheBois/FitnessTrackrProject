/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
const e = require("express");
const client = require("./client");
const { getUserByUsername } = require("./users");

//works
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

//works
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

//works
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

//works
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

//works
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

// Still in progress.
async function getAllRoutinesByUser( {username} ) {
  console.log(`Starting getAllRoutinesByUser for user ${username}`);

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      console.log(`User ${username} not found`);
      return null;
    }

    console.log(`User ${username} found with id ${user.id}`);

    const { rows: routines } = await client.query(`
      SELECT routines.id, routines.name, routines.goal, activities.name 
      AS activity_name, activities.description
      AS activity_description, routine_activities.count, routine_activities.duration
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities."routineId"
      JOIN activities ON routine_activities."activityId" = activities.id
      WHERE routines."creatorId" = $1
    `, [user.id]);

    // .reduce walks through element-by-element, 
    const routinesData = routines.reduce((acc, row) => {
      const existingRoutine = acc.find(routine => routine.id === row.id);
      if (existingRoutine) {
        existingRoutine.activity.push({
          name: row.activity_name,
          description: row.activity_description,
          count: row.count,
          duration: row.duration,
        });
      } else {
        acc.push({
          id: row.id,
          name: row.name,
          goal: row.goal,
          activity: [{
            name: row.activity_name,
            description: row.activity_description,
            count: row.count,
            duration: row.duration,
          }],
        });
      }
      return acc;
    }, []);

    return routinesData;
    
  } catch (error) {
    console.log(`Error while getting routines for user ${username}: ${error.message}`);
    throw error;
  }
}

// Very similar to getAllRoutines, we just change the SQL a little to select the isPublic
// column and add the condition to the WHERE clause.
async function getPublicRoutinesByUser({ username }) {
  console.log(`Starting getAllRoutinesByUser for user ${username}`);

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      console.log(`User ${username} not found`);
      return null;
    }

    console.log(`User ${username} found with id ${user.id}`);

    const { rows: routines } = await client.query(`
      SELECT routines.id, routines.name, routines.goal, routines."isPublic", activities.name 
      AS activity_name, activities.description
      AS activity_description, routine_activities.count, routine_activities.duration
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities."routineId"
      JOIN activities ON routine_activities."activityId" = activities.id
      WHERE routines."creatorId" = $1 AND routines."isPublic" = true
    `, [user.id]);

    // .reduce walks through element-by-element, 
    const routinesData = routines.reduce((acc, row) => {
      const existingRoutine = acc.find(routine => routine.id === row.id);
      if (existingRoutine) {
        existingRoutine.activity.push({
          name: row.activity_name,
          description: row.activity_description,
          count: row.count,
          duration: row.duration,
        });
      } else {
        acc.push({
          id: row.id,
          name: row.name,
          goal: row.goal,
          activity: [{
            name: row.activity_name,
            description: row.activity_description,
            count: row.count,
            duration: row.duration,
          }],
        });
      }
      return acc;
    }, []);

    return routinesData;
    
  } catch (error) {
    console.log(`Error while getting routines for user ${username}: ${error.message}`);
    throw error;
  }
}

// Works for now, not thoroughly tested yet.
// This uses a "subquery" to select routin ids associated with a specified id.
async function getPublicRoutinesByActivity({ id }) {
  console.log(`Starting getAllRoutinesByActivity for ID: ${id}`);

  try {
    const { rows: routines } = await client.query(`
      SELECT routines.id, routines.name, routines.goal, routines."isPublic", activities.name 
      AS activity_name, activities.description
      AS activity_description, routine_activities.count, routine_activities.duration
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities."routineId"
      JOIN activities ON routine_activities."activityId" = activities.id
      WHERE routines."isPublic" = true AND routines.id IN
        (SELECT "routineId" FROM routine_activities WHERE "activityId" = $1)
    `, [id]);

    // .reduce walks through element-by-element, 
    const routinesData = routines.reduce((acc, row) => {
      const existingRoutine = acc.find(routine => routine.id === row.id);
      if (existingRoutine) {
        existingRoutine.activity.push({
          name: row.activity_name,
          description: row.activity_description,
          count: row.count,
          duration: row.duration,
        });
      } else {
        acc.push({
          id: row.id,
          name: row.name,
          goal: row.goal,
          activity: [{
            name: row.activity_name,
            description: row.activity_description,
            count: row.count,
            duration: row.duration,
          }],
        });
      }
      return acc;
    }, []);

    return routinesData;
    
  } catch (error) {
    console.log(`Error while calling getPublicRoutinesByActivity`);
    throw error;
  }
}

// Should work??
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

//Works! 
async function destroyRoutine(id) {
  console.log("Starting destroyRoutineID");
  try {
    await client.query('BEGIN');

    // delete the routine activities associated with this routine
    await client.query(`
      DELETE FROM routine_activities
      WHERE "routineId" = $1;
    `, [id]);

    // delete the routine itself
    const deleteRoutine = await client.query(`
      DELETE FROM routines
      WHERE id = $1
      RETURNING *;
    `, [id]);

    await client.query('COMMIT');

    console.log("Finishing destroyRoutineID");

    return deleteRoutine.rows[0];
  } catch(error) {
    await client.query('ROLLBACK');
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

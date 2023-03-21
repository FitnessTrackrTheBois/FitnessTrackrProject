/* eslint-disable no-unused-vars */
const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  // eslint-disable-next-line no-useless-catch
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
    throw error;
  }
}

async function getRoutineById(id) {}

async function getRoutinesWithoutActivities() {
  // eslint-disable-next-line no-useless-catch
  try{
    const { rows } = await client.query(`
    SELECT "creatorId", "isPublic", name, goal
    FROM routines;
    `);

    return rows;

  } catch (error) {
      throw error;
  }
}

async function getAllRoutines() {}

async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

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

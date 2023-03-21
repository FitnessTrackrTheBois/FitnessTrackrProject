/* eslint-disable no-unused-vars */
const client = require("./client");

// database functions
async function createActivity({ name, description }) {
  try {
        console.log("starting createActivity");
    const { rows: [ activity ] } = await client.query(`
        INSERT INTO activities(name, description)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
        
    `, [name, description]);

      console.log("finished createActivity");
    return activity;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllActivities() {
  try{
    const { rows } = await client.query(`
    SELECT id, name, description
    FROM activities;
    `);

    return rows;

  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function getActivityById(id) {}

async function getActivityByName(name) {}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};

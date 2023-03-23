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

async function getActivityById(id) {
  try {
    console.log("Starting getActivityById");
  const { rows: [ activity ]  } = await client.query(`
      SELECT * FROM activities
      WHERE id=$1;
  `, [id]);
    console.log("finished getActivityById");

    console.log(activity);
    return activity;

  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function getActivityByName(name) {
  try {
    console.log("Getting getActivityByName")
    const { rows: [ activity ] } = await client.query(`
        SELECT * FROM activities
        WHERE name=$1
    `, [ name ]);

    if (!activity) {
        return null
    }

    console.log("Finished getActivityByName");
    return activity;

    } catch (error) {
        console.log(error);
        throw error;
    }
}



// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  
}

async function updateActivity({ id, fields = {} }) {
  console.log("Starting updateActivity");

  const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  try {
      
          const result = await client.query(`
              UPDATE activities
              SET ${ setString }
              WHERE id=${ id }
              RETURNING *;
          `, Object.values(fields));
      

      if (result.rowCount > 0) {  
        console.log("finished updateActivity");
        return await getActivityById(id);
      } else {
        throw new Error("No rows updated.");
      }

  } catch (error) {
      console.log(error);
      throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};

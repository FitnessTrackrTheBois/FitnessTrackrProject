/* eslint-disable no-unused-vars */
const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
      console.log("starting createUser");
    const { rows: [ user ] } = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
        
    `, [username, password]);

      console.log("finished createUser");
    return user;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUser({ username, password }) {
  console.log("Calling get user");
}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}

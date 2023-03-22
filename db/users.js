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


// Not sure how to get this to 
// "verify the password against the hashed password"
async function getUser({ username, password }) {
  //const user = await getUserByUserName(username);
  console.log("You recently called getUserByUserName");
  //console.log("Here's what was returned: " + user);

  //const hashedPassword = user.password;
}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {
  try {
    console.log("Getting a user by their username")
    const { rows: [ user ] } = await client.query(`
        SELECT id, username, password
        FROM users
        WHERE username=$1
    `, [ userName ]);

    if (!user) {
        return null
    }

    // user.posts = await getPostsByUser(userId);

    console.log("Finished getting a user by their username");
    return user;

    } catch (error) {
        throw error;
    }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}

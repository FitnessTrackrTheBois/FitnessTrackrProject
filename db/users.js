const client = require("./client");
const bcrypt = require("bcrypt");

// user functions
async function createUser({ username, password }) {
  try {
    console.log("starting createUser");
    let saltRounds = 10;
    let hashPassword = await bcrypt.hash(password, saltRounds);
    
    const { rows: [ user ] } = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
    `, [username, hashPassword]);

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
  try{
    const {rows: [ user ]} = await client.query(`
      SELECT id, username, password
      FROM users
      WHERE username = $1;
    `,[username]);
    if (!user){
      throw error;
      // return null
    }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw error;
    // return null;
  }

  return user;

  }catch(error){
    throw error;
  }
}

async function getUserById({id}) {
  try{
    console.log("Getting user by Id")
    const {rows} = await client.query(`
    SELECT id, username, password
    FROM users
    WHERE id=$1`,
    [id]);
    if(!id){
      return null
    }
    console.log ("Finished getting user by Id");
    return rows
  }catch(error){
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    console.log("Getting a user by their username")
    const { rows: [ user ]  } = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
    `, [ username ]);

    // if (!user) {
    //   console.log("User not found");
    //   return null;
    // }

    console.log("Finished getting a user by their username");
    return user;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername
}

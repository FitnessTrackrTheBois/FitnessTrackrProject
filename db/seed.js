/* 
DO NOT CHANGE THIS FILE
*/
const client = require('./client');
const { rebuildDB } = require('./seedData');
const client = new client(process.env.DATABASE_URL);
rebuildDB()
  .catch(console.error)
  .finally(() => client.end());

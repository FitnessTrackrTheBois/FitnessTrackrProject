module.exports = {
  // ...require('./client'), // adds key/values from users.js
  ...require('./users'), // adds key/values from users.js
  ...require('./activities'), // adds key/values from activites.js
  ...require('./routines'), // adds key/values from routines.js
  ...require('./routine_activities') // adds key/values from routine_activities.js
}
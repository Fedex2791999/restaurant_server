const auth = require('./auth');
const verify = require('./verify');

console.log('Middleware');

// export object, ham
// khi import can {auth}
module.exports = {
  auth,
  verify,
};

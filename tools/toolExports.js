
const {checkAdmin} = require('./check-admin');
const {checkSecret} = require('./checkSecret');
const {checkUserLevel,levelAccess} = require('./checkUserLevel');
const {checkIsAdmin} = require('./checkIsAdmin');

module.exports = {checkSecret,checkUserLevel,checkAdmin,checkIsAdmin,levelAccess};

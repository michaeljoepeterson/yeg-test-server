
const {checkAdmin} = require('./check-admin');
const {checkSecret} = require('./checkSecret');
const {checkUserLevel} = require('./checkUserLevel');
const {checkIsAdmin} = require('./checkIsAdmin');

module.exports = {checkSecret,checkUserLevel,checkAdmin,checkIsAdmin};

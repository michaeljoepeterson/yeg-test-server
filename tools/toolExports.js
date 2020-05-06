
const {checkAdmin} = require('./check-admin');
const {checkSecret} = require('./checkSecret');
const {checkUserLevel} = require('./checkUserLevel');

module.exports = {checkSecret,checkUserLevel,checkAdmin};

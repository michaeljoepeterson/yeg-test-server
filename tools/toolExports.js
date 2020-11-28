
const {checkAdmin} = require('./check-admin');
const {checkSecret} = require('./checkSecret');
const {checkUserLevel,levelAccess} = require('./checkUserLevel');
const {checkIsAdmin} = require('./checkIsAdmin');
const {checkFbAuth} = require('./fb');

module.exports = {checkSecret,checkUserLevel,checkAdmin,checkIsAdmin,levelAccess,checkFbAuth};

exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.ADMIN_S = process.env.ADMIN_S;
exports.ADMIN_SECRET = process.env.ADMIN_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '30m';
exports.DOMAINS = process.env.DOMAINS;
//exports.ADMIN_EMAILS = process.env.ADMIN_EMAILS;
//exports.ADMIN_LOC = process.env.ADMIN_LOC;

const admin = require('firebase-admin');
const serviceAccount = require('./admin.json');

exports.fb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://byh-app.firebaseio.com"
});
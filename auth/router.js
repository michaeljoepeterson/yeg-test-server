const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { JWT_SECRET,JWT_EXPIRY } = require('../config');
const {checkFbAuth} = require('../tools/toolExports');
const router = express.Router();
//create the token
const createAuthToken = function(user){
	return jwt.sign({user}, JWT_SECRET,{
		subject: user.username,
		expiresIn: JWT_EXPIRY,
		algorithm: 'HS256'
	});
}

const localAuth = passport.authenticate('local',{session: false});
router.use(bodyParser.json());

router.post('/login', checkFbAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session:false});

router.post('/refresh', jwtAuth, (req,res)=>{
	const authToken = createAuthToken(req.user);
	res.json({authToken});
});

module.exports = {router};
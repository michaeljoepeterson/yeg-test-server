const admin = require('firebase-admin');
const {User} = require('../models/user');

const checkFbAuth = async(req,res,next) => {
    if(req.headers.authtoken){
        try{
            const decodedToken = await admin.auth().verifyIdToken(req.headers.authtoken);
            let {email} = decodedToken;
            
            let user = await User.findByEmail(email);
            if(!user){
                
                /*
                user = await User.create({

                });
                */
            }
            else{
                req.user = user;
            }
            //to do
            //find user from decoded token
            //set req.user to found user
            //potentially remove serialize/local auth from router?
            next();
        }
        catch(e){
            res.status(421);
            return res.json({
                message:'Unauthorized'
            });
        }
    }
    else{
        res.status(422);
        return res.json({
			message:'Unauthorized'
		});
    }
}

module.exports = {checkFbAuth};
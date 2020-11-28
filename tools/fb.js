const admin = require('firebase-admin');

const checkFbAuth = async(req,res,next) => {
    if(req.headers.authtoken){
        try{
            const decodedToken = await admin.auth().verifyIdToken(req.headers.authtoken);
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
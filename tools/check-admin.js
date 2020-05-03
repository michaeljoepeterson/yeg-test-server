const {ADMIN_S} = require('../config');


let checkAdmin = function(req,res,next){
    let {admin} = req.query;
    if(admin === ADMIN_S){
        next();
    }
    else{
        return res.json({
            code:400,
            message:'Unathorized'
        });
    }
}

module.exports = {checkAdmin};
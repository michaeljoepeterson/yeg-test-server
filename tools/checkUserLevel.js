let checkUserLevel = function(req,res,next){
    let userLevel = parseInt(req.query.level);
    let createLevel = parseInt(req.body.level);
    if(userLevel < createLevel){
        next();
    }
    else{
        return res.status(422).json({
			code:400,
			message:"Unauthorized"
		});
    }
}

let levelAccess = function(level){
    return async (req, res, next) => {
        try {
            let {userLevel} = req.query;
            if(userLevel <= level){
                next();
            }
            else{
                throw {message:'Unauthorized'}
            }
        }
        catch (error) {
            return res.status(422).json({
                code:400,
                message:"Unauthorized"
            });
        }
    }
}

module.exports = {checkUserLevel,levelAccess};
let checkUserLevel = function(req,res,next){
    let userLevel = parseInt(req.query.level);
    let createLevel = parseInt(req.body.level);
    if(userLevel < createLevel){
        next();
    }
    else{
        return res.status(422).json({
			code:400,
			message:"Unathorized"
		});
    }
}

module.exports = {checkUserLevel};
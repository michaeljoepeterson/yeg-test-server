let checkIsAdmin = function(req,res,next){
    let {level} = req.query;
    if(level <= 1){
        next();
    }
    else{
        return res.json({
            code:400,
            message:'Unathorized'
        });
    }
}

module.exports = {checkIsAdmin};
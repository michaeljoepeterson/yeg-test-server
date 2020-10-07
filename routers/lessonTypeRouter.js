const express = require('express');
const {User, LessonType} = require('../models/lessonType');
const router = express.Router();
const {levelAccess} = require('../tools/toolExports');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use(jwtAuth);

router.post('/',levelAccess(1),async (req,res) => {
    let {lessonType} = req.body;
    try{
        let type = await LessonType.create(lessonType);
        return res.json({
            code:200,
            message:'Type created',
            type:type.serialize()
        });
    }
    catch(e){
        console.log('error creating type: ',e);
        return res.json({
            code: 500,
            message: 'an error creating type',
            error: e
        });
    }
});


router.get('/',(req,res) => {
    
});

router.put('/',levelAccess(1),async (req,res) => {

});


module.exports = {router};
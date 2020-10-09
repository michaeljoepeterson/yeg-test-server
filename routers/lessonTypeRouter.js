const express = require('express');
const {User, LessonType} = require('../models/lessonType');
const router = express.Router();
const {levelAccess} = require('../tools/toolExports');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use(jwtAuth);

router.post('/',levelAccess(1),async (req,res) => {
    let {lessonType} = req.body;
    console.log(lessonType,req.body);
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


router.get('/',async (req,res) => {
    try{
        let types = await LessonType.find();
        return res.json({
            code:200,
            message:'Types Found',
            types:types.map(type => type.serialize())
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

router.put('/:id',async (req,res) => {
    const {id} = req.params;
    const {lessonType} = req.body
    try{
        let types = await LessonType.findOneAndUpdate({_id:id},{
            $set:lessonType
        });
        return res.json({
            code:200,
            message:'Type Updated',
            types:types.map(type => type.serialize())
        });
    }
    catch(e){
        console.log('error creating type: ',e);
        return res.json({
            code: 500,
            message: 'an error updating type',
            error: e
        });
    }
});

router.put('/',levelAccess(1),async (req,res) => {

});


module.exports = {router};
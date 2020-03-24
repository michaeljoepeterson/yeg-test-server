const express = require('express');
const {Lesson} = require('../models/lesson');
const router = express.Router();
const passport = require('passport');
//const {checkAdminEmails,checkEmail,checkUser,checkAdminLocs} = require('../tools/toolExports');
const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(jwtAuth);

router.post('/',(req,res) => {
    const {date,lessonType,notes,students,teacher} = req.body;

    return Lesson.create({
        date,
        lessonType,
        notes,
        students,
        teacher
    })

    .then(lesson => {
        return res.json({
            code:200,
            message:'Lesson created'
        });
    })

    .catch(err => {
        console.log('error ',err);
        if(err.message.includes('E11000')){
            return res.json({
                code:401,
                message:'User already exists'
            });
        }
        return res.json({
            code:500,
            message:'an error occured'
        });
    })
    
});

module.exports = {router};
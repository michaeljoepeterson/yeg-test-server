const express = require('express');
const {Lesson} = require('../models/lesson');
const router = express.Router();
//const {checkAdminEmails,checkEmail,checkUser,checkAdminLocs} = require('../tools/toolExports');

router.post('/',(req,res) => {
    const {date,lessonType,notes,students} = req.body;

    return Lesson.create({
        date,
        lessonType,
        notes,
        students
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
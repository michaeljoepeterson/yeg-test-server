const express = require('express');
const {Lesson} = require('../models/lesson');
const {User} = require('../models/user');
const router = express.Router();
const passport = require('passport');
//const {checkAdminEmails,checkEmail,checkUser,checkAdminLocs} = require('../tools/toolExports');
const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(jwtAuth);

router.post('/',(req,res) => {
    const {date,lessonType,notes,students,teacher} = req.body;
    console.log(req.body);
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
                message:'Lesson already exists'
            });
        }
        return res.json({
            code:500,
            message:'an error occured'
        });
    })
    
});

router.get('/',(req,res) => {
    return Lesson.find({}).populate('students').populate('teacher')

    .then(lessons => {
       return res.json({
            code:200,
            lessons:lessons.map(lesson => lesson.serialize())
        }); 
    })

    .catch(err => {
        return res.json({
            code:500,
            message:'an error occured',
            error:err
        });
    });
});

function findById(id){
    let promise = new Promise((resolve,reject) => {
        return Lesson.find({teacher:id}).populate('students').populate('teacher')

        .then(lessons => {
            resolve(lessons)
        })
        .catch(err => {
            reject(err);
        });
    });

    return promise;
}

function findByEmail(id){
    let promise = new Promise((resolve,reject) => {
        return Lesson.find({}).populate('students').populate('teacher')

        .then(lessons => {
            resolve(lessons)
        })
        .catch(err => {
            reject(err);
        });
    });

    return promise;
}

router.get('/search',(req,res) => {
    let {id,email} = req.query;
    if(id){
        return findById(id)

        .then(lessons => {
            return res.json({
                code:200,
                lessons:lessons.map(lesson => lesson.serialize())
            }); 
        })
        .catch(err => {
            return res.json({
                code:500,
                message:'an error occured',
                error:err
            });
        });
    }
    else if(email){

    }
    
});

module.exports = {router};
const express = require('express');
const {Student} = require('../models/student');
const router = express.Router();
const passport = require('passport');
const {checkIsAdmin} = require('../tools/toolExports');
//const {checkAdminEmails,checkEmail,checkUser,checkAdminLocs} = require('../tools/toolExports');
const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(jwtAuth);

router.post('/',checkIsAdmin,(req,res) => {
    const {firstName,lastName,category} = req.body;

    return Student.create({
        firstName,
        lastName,
        category
    })

    .then(student => {
        return res.json({
            code:200,
            message:'Student created',
            fullName:student.fullName
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
            message:'an error occured',
            error:err
        });
    })
    
});

router.get('/',(req,res) => {
    return Student.find({}).populate('category')

    .then(students => {
       return res.json({
            code:200,
            students:students.map(student => student.serialize())
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

module.exports = {router};
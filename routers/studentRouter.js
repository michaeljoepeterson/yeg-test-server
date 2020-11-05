const express = require('express');
const {Student} = require('../models/student');
const router = express.Router();
const passport = require('passport');
const {checkIsAdmin,levelAccess} = require('../tools/toolExports');
//const {checkAdminEmails,checkEmail,checkUser,checkAdminLocs} = require('../tools/toolExports');
const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(jwtAuth);

router.post('/',checkIsAdmin,(req,res) => {
    const {firstName,lastName,category,active} = req.body;

    return Student.create({
        firstName,
        lastName,
        category,
        active,
        notes
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

router.get('/',async (req,res) => {
    try {
        const students = await Student.find({}).populate('category');
        return res.json({
            code: 200,
            students: students.map(student => student.serialize())
        });
    } catch (err) {
        return res.json({
            code: 500,
            message: 'an error occured',
            error: err
        });
    }
});

router.put('/:id',levelAccess(1),async (req,res) => {
    const {id} = req.params; 
    const {student} = req.body;
    try {
        await Student.findOneAndUpdate({ _id:id }, {
            $set: student
        });
        return res.json({
            code: 200,
            message:"Student updated"
        });
    } catch (err) {
        console.log('error updating student:',err);
        res.status(500);
        return res.json({
            code: 500,
            message: 'an error occured',
            error: err
        });
    }
});
//hide user
router.delete('/:id',levelAccess(1),async (req,res) => {
    const {id} = req.params; 
    try {
        await Student.findOneAndUpdate({ _id:id }, {
            $set: {access:false}
        });
        return res.json({
            code: 200,
            message:"Student removed"
        });
    } catch (err) {

        return res.json({
            code: 500,
            message: 'an error occured',
            error: err
        });
    }
});

module.exports = {router};
const express = require('express');
const {User} = require('../models/user');
const {checkAdmin} = require('../tools/toolExports');
const router = express.Router();
//const {checkAdminEmails,checkEmail,checkUser,checkAdminLocs} = require('../tools/toolExports');

//create super admin
router.post('/admin',checkAdmin,(req,res) => {
    const {email,password} = req.body;

    return User.hashPassword(password)

    .then(hash => {
        return User.create({
            email,
            password:hash,
            admin:true
        })
    })

    .then(user => {
        return res.json({
            code:200,
            message:'User created'
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
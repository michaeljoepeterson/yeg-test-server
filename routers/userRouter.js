const express = require('express');
const {User} = require('../models/user');
const router = express.Router();
const {checkSecret,checkUserLevel} = require('../tools/toolExports');

router.post('/admin',checkSecret,(req,res) => {
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

router.post('/user',checkUserLevel,(req,res) => {
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
const express = require('express');
const {Category} = require('../models/Category');
const router = express.Router();
const passport = require('passport');
const {checkIsAdmin} = require('../tools/toolExports');
//const {checkAdminEmails,checkEmail,checkUser,checkAdminLocs} = require('../tools/toolExports');
const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(jwtAuth);

//create category
router.post('/',checkIsAdmin,(req,res) => {
    const {name} = req.body;

    return Category.create({
        name
    })

    .then(category => {
        return res.json({
            code:200,
            message:'category created',
            name:category.name
        });
    })

    .catch(err => {
        console.log('error ',err);
        if(err.message.includes('E11000')){
            return res.json({
                code:401,
                message:'Category already exists'
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
    return Category.find({})

    .then(categories => {
       return res.json({
            code:200,
            categories:categories.map(student => student.serialize())
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
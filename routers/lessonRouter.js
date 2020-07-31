const express = require('express');
const {Lesson} = require('../models/lesson');
const {User} = require('../models/user');
const router = express.Router();
const passport = require('passport');
const user = require('../models/user');
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

function findById(id,start,end){
    let promise = new Promise((resolve,reject) => {
        let query = {
            teacher:id
        };
        if(start && end){
            query["date"] = {
                $gte:end,
                $lte:start
            }
        }
        console.log(query);
        return Lesson.find(query).populate('students').populate('teacher')

        .then(lessons => {
            resolve(lessons)
        })
        .catch(err => {
            reject(err);
        });
    });

    return promise;
}

function findByEmail(email,start,end){
    let promise = new Promise((resolve,reject) => {
        return User.find({email})

        .then(user => {
            let id = user[0]._id;
            return findById(id,start,end);
        })

        .then(lessons => {
            resolve(lessons);
        })

        .catch(err => {
            reject(err);
        });

    });

    return promise;
}

function generalSearch(start,end,id,email){
    let promise = new Promise((resolve,reject) => {
        let query = {};
        return User.find({
            date:{
                $gte:end,
                $lte:start
            }
        })

        .then(user => {
            let id = user[0]._id;
            console.log(user);
            console.log(id);
            return findById(id);
        })

        .then(lessons => {
            resolve(lessons);
        })

        .catch(err => {
            reject(err);
        });

    });

    return promise;
}

router.get('/my-lessons',(req,res) => {
    let {id,email,startDate,endDate} = req.query;
    let start = startDate ? new Date(startDate) : new Date();
    //inclusive of start day
    start.setDate(start.getDate() + 1);
    let end = endDate ? new Date(endDate) : new Date(start);
    if(!endDate){
        const defaultRange = 30;
        end.setDate(end.getDate() - 30);
    }
    //inclusive of end day
    end.setDate(end.getDate() - 1);
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    console.log(id,email);
    if(id){
        return findById(id,start,end)

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
        return findByEmail(email,start,end)

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
    
});

function createUpdateData(body){
    let data = {};
    let today = new Date();
    for(let field in body){
        data[field] = body[field];
    }
    //pass from browser?
    data.lastEdited = data.lastEdited ? data.lastEdited : today;

    return data;
}

router.put('/:id',(req,res) => {
    let {id} = req.params;
    const updateData = createUpdateData(req.body);

    return Lesson.findOneAndUpdate({'_id':id},{
        $set:updateData,
        $inc:{"totalEdits":1}
    },{
        useFindAndModify:false
    })

    .then(response => {
        return res.json({
            code:200,
            message:'Lesson Updated'
        });
    })

    .catch( err=> {
        console.log('Error updating lesson ',err);
        return res.json({
            code:500,
            message:'Error Updating lesson',
            error:err.errmsg
        });
    });
});

module.exports = {router};
const {Lesson} = require('../../models/lesson');
const {User} = require('../../models/user');

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

module.exports = {findById,findByEmail,generalSearch};
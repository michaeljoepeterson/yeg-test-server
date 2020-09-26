const {Lesson} = require('../../models/lesson');
const {User} = require('../../models/user');
const {Student} = require('../../models/student');

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
        return Lesson.find(query).populate('teacher').populate({
            path:'students',
            populate:{
                path:'category'
            }
        })

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

async function findTeacher(teacherId,teacherEmail){
    try{
        if(teacherId){
            let teacher = await User.findById(teacherId);
            return teacher[0].serialize();
        }
        else{
            let teacher = await User.find({email:teacherEmail});
            return teacher[0].serialize();
        }
    }
    catch(e){
        console.log('error finding teacher: ',e);
        throw e
    }
}

async function findStudent(studentId,first,last){
    try{
        if(studentId){
            let students = await Student.findById(studentId);
            return students;
        }
        else{
            let students = await Student.find({firstName:first,lastName:last});
            return students;
        }
    }
    catch(e){
        console.log('error finding student: ',e);
        throw e
    }
}

async function queryBuilder(options){
    let {startDate,endDate,studentId,studentFirst,studentLast,teacherId,lessonType,teacherEmail} = options;
    let query = {};
    if(endDate){
        let start = startDate ? new Date(startDate) : new Date();
        //inclusive of start day
        start.setDate(start.getDate() + 1);
        let end = endDate ? new Date(endDate) : new Date(start);
        query.date = {};
        query.date.$gte = end;
        query.date.$lte = start;
    }
    if(studentId){
        let students = await findStudent(studentId);
        students = students.map(student => student.serialize());
        query.students = students[0].id;
    }
    else if(studentFirst && studentLast){
        let students = await findStudent(null,studentFirst,studentLast);
        students = students.map(student => student.serialize());
        //in this caes do multiple queries to get lessons of all students with same name
        query.students = students.map(student => student.id);
    }

    if(teacherId){
        let teacher = await findTeacher(teacherId);
        query.teacher = teacher.id;
    }
    else if(teacherEmail){
        let teacher = await findTeacher(null,teacherEmail);
        query.teacher = teacher.id;
    }

    return query;
}

async function generalSearch(options){
    let query = await queryBuilder(options);
    console.log(query)
    try {
        const lessons = await Lesson.find(query).populate('teacher').populate({
            path:'students',
            populate:{
                path:'category'
            }
        });
        return lessons
    } catch (err) {
        throw(err);
    }

}

module.exports = {findById,findByEmail,generalSearch};
const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    date:{type:Date,required:true},
    lessonType:{type:String,required:true},
    notes:{type:String},
    students:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', unique: false, required: [false, 'No students found']}],
    teacher:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: false, required: [true, 'No teacher found']}
});

const Lesson = mongoose.model("Lesson",lessonSchema);

module.exports = {Lesson};
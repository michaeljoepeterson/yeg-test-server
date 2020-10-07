const mongoose = require('mongoose');

const lessonTypeSchema = mongoose.Schema({
    name:{type:String,required:true,unique:true}
});


lessonTypeSchema.methods.serialize = function(){
	return {
		id:this._id,
		name:this.name,
	};
};

const LessonType = mongoose.model("LessonType",lessonTypeSchema);

module.exports = {LessonType};
const mongoose = require('mongoose');

const lessonTypeSchema = mongoose.Schema({
	name:{type:String,required:true,unique:true},
	active:{type:Boolean,default:false}
});


lessonTypeSchema.methods.serialize = function(){
	return {
		id:this._id,
		name:this.name,
		active:this.active
	};
};

const LessonType = mongoose.model("LessonType",lessonTypeSchema);

module.exports = {LessonType};
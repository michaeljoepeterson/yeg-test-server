const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true}
},{minimize:false});

studentSchema.virtual("fullName").get(function(){
	return this.firstName + ' ' + this.lastName;
})

const Student = mongoose.model("Student",studentSchema);

module.exports = {Student};
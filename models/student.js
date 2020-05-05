const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    category:{type:String,required:true}
},{minimize:false});

studentSchema.methods.serialize = function(){
	return{
		firstName: this.firstName || '',
        lastName: this.lastName || '',
        id:this._id,
        fullName:this.fullName
	};
}

studentSchema.virtual("fullName").get(function(){
	return this.firstName + ' ' + this.lastName;
})

const Student = mongoose.model("Student",studentSchema);

module.exports = {Student};
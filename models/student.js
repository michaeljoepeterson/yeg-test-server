const mongoose = require('mongoose');
//change category to id relationship to category model
const studentSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    category:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', unique: false, required: [false, 'No students found']}],
    active:{type:Boolean,default:false},
    notes:{type:String,default:""}
},{minimize:false});

studentSchema.methods.serialize = function(){
    //console.log('==========student: ',this)
	return{
		firstName: this.firstName || '',
        lastName: this.lastName || '',
        id:this._id,
        fullName:this.fullName,
        category:this.category ? this.category.map(resp => resp.serialize()) : [],
        active:this.active,
        notes:this.notes
	};
}

studentSchema.virtual("fullName").get(function(){
	return this.firstName + ' ' + this.lastName;
})

const Student = mongoose.model("Student",studentSchema);

module.exports = {Student};
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//0 super admin, 1 admin, 2 teacher
//will need to modify schema for regular users
const userSchema = mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password: {type: String, required: true},
    admin:{type:Boolean},
    lastAccess:{type:Date},
    lastLogin:{type:Date},
    lastLoginAttempt:{type:Date},
    level:{type:Number, required: true}
});

userSchema.methods.serialize = function(){
	return{
		username: this.email || '',
        id:this._id
	};
}

userSchema.methods.validatePassword = function(password){
	return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
 	 return bcrypt.hash(password, 10);
};

const User = mongoose.model('User',userSchema);

module.exports = {User};
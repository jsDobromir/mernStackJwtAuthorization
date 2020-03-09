const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 40
    },
    email : {
        type : String,
        required : [true,"Please provide an email"],
        unique : true,
        validate : [validator.isEmail,"Please provade valid email!"]
    },
    password : {
        type : String,
        required : [true,"Please provide a password"],
        minlength : 8,
        select : false
    },
    confirmPassword : {
        type : String,
        required : [true,"Please confirm your password"],
        validate : {
            // This only work on CREATE and SAVE!!!
            validator : function(el) {
                return el === this.password;
            },
            message : 'Passwords are not the same!'
        }
    },
    passwordChangedAt : {
        type : Date
    },
    passwordResetToken : String,
    passwordResetExpires : Date,
    photo : {
        type : String
    },
    isActive : {
        type : Boolean,
        default : false
    },
    activationTokenExpiresAt : {
        type : Date
    }
},{timestamps : true});

employeeSchema.pre("save",async function(next){
    if(!this.isModified('password')) next();
    let passHashed = await bcrypt.hash(this.password,10);
    this.password = passHashed;
    this.confirmPassword = undefined;
    next();
});

employeeSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = Employee;
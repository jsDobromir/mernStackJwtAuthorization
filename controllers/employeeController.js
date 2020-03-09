const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const { promisify } = require('util');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//have to send mail

exports.signUp = catchAsync(async (req,res,next) => {

    const {name,email} = req.body;

    const employee = await Employee.findOne({email});
    if(employee){
        return next(new AppError('User with this email already exists'),401);
    }

    const employeeToSave = await Employee.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword,
        activationTokenExpiresAt : Date.now() + (3 * 60 * 1000)
    });

    //will send mail to the user with token to confirm registration
    if(employeeToSave) {
        const token = jwt.sign({_id : employeeToSave._id,name,email},process.env.JWT_SECRET,{
            expiresIn : '10m'
        });
    
        const msg = {
            to : email,
            from : process.env.EMAIL_FROM,
            subject : 'Registration confirmation',
            html : `
                <p>Hallo ${name},please click on the following link to confirm your registration</p>
                <h2>${process.env.CLIENT_URL}/auth/activate/${token}</h2>
            `
        };
    
        const emailSent = await sgMail.send(msg);
        return res.status(200).json({
            message : `Email confirmation have been sent to ${email},please confirm your email in 10min`
        });
    }
    

});


exports.activateAccount = catchAsync(async (req,res,next) => {
    const {token} = req.body;
    if(token){
        //get the token,verify it 
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET,{ignoreExpiration : true});
        const currentUser = await Employee.findById(decoded._id);
        //check to see if user is already activated
        if(currentUser){
            if(currentUser.isActive){
                return next(new AppError('User is already activated'),401);
            }
        }
        //check to see if user token is expired
        if(currentUser){
            //if token is expired delete user from database
            if(Date.now() > currentUser.activationTokenExpiresAt){
                await currentUser.deleteOne();
                return next(new AppError('The token has expired ,please sign up again'),401);
            }
            //else everything should be fine and activate his account
            await Employee.findByIdAndUpdate({_id : decoded._id},{isActive : true});
            res.status(200).json({
                message : 'Activation successfull,you can sign in now'
            });
        }else{
            return res.status(404).json({
                message : 'User does not exists anymore'
            });
        }
        
    }else{
        return next(new AppError('Something went wrong ,try again',404));
    }

});

exports.login = catchAsync(async (req,res,next) => {

    const {email,password} = req.body;

    const employee = await Employee.findOne({email}).select('+password');
    if(employee){
        
        const correctPassword = await employee.correctPassword(password,employee.password);

        if(!correctPassword){
            return next(new AppError('Email or password is wrong,login failed,try again'),404);
        }

        //else password is correct ,have to check whether user is Active
        if(!employee.isActive){
            return next(new AppError('This account is not activated, please activate it!!!',404));
        }
        
        const token = jwt.sign({_id : employee._id},process.env.JWT_SECRET,{
            expiresIn : '10d'
        });

        //else user is correct have to log him
        res.status(200).json({
            status : 'success',
            token : token,
            data : {
                employee
            }
        });
    }
    else{
        return next(new AppError('Email or password is wrong,login failed,try again'),404);
    }

});


exports.verifyToken = catchAsync( async (req,res,next) => {
    const {token} = req.body;

    if(token){

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        
        const currentEmployee = await Employee.findById({_id : decoded._id});

        if(!currentEmployee){
            return next(new AppError('The user belonging to this token does not exist anymore',401));
        }

        res.status(200).json({
            message : 'success',
            data : {
                currentEmployee
            }
        });

    }else{
        return next(new AppError('No token provided'),400);
    }
});

// exports.signUp = catchAsync(  async (req,res) => {
//     console.log(req.body);
//     const employee = await Employee.create(req.body);

//     const token = jwt.sign({id : employee._id},process.env.JWT_SECRET,{
//         expiresIn : 36000
//     });

//     res.status(200).json({
//         status : 'success',
//         token : token,
//         employee : employee
//     });
// });
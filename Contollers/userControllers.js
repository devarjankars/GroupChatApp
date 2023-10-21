
const User= require('../Models/user');
const path= require('path');


exports.postNewUserData= async(req, res, next)=>{
    try{
        const dataObj={
            name: req.body.name,
            email: req.body.Email,
            number: req.body.number,
            password: req.body.password,
        }
        await User.create(dataObj);
       
       res.redirect('/login');
       //res.status(201).json({msg:"succesfully sign up"});
    }
    catch(err){
        console.log(err);
    }
};
exports.getLogin=async(req, res, next)=>{
    try{
        res.status(200).sendFile(path.join(__dirname, "../", "public", "views", "login.html"))
    }
    catch(err){
    console.log(err);
    }
};

exports.getSignUp=async(req, res, next)=>{
    try{
        res.status(200).sendFile(path.join(__dirname, "../", "public", "views", "signUp.html"))
    }
    catch(err){
        console.log(err);
    }
};

exports.LoginData=async(req,res,next)=>{
try{
    const email=req.body.logEmail;
    const password=req.body.logPwd;
    const user=User.findOne({where:{email:logEmail}})
    if(user){

    }
    else{
        
    }

}
catch(err){console.log(err);}
}


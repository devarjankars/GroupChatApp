
const User= require('../Models/user');
const path= require('path');
const bcrypt=require('bcrypt')
const jwt= require ('jsonwebtoken');

function getJwtToken( id , mail){
    return jwt.sign({ userId: id, email: mail }, process.env.TOKEN);

}


exports.postNewUserData= async(req, res, next)=>{
    try{
       // console.log(req.body);
        const dataObj={
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password,
        }
        //console.log(dataObj);
        let user= await User.findOne({where:{email:req.body.email}})
        if(user){
            res.status(409).json({msg:"Your email already present Please login"})
        }
        else{
            bcrypt.hash(req.body.password, 10, async (err ,hash)=>{
                await User.create({
                    name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: hash,
                });
                res.redirect('/login');
            })
       //res.status(201).json({msg:"succesfully sign up"});
    }}
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
    console.log(req.body.logObj);
    const email=req.body.logObj.logEmail;
    const password=req.body.logObj.logpwd;
    console.log(email,password);
    let user= await User.findAll({where:{email:email}})
    console.log(user[0]);
    if(user[0]){
       bcrypt.compare(password, user[0].password,(err,result)=>{
        if(err){
            return res.
            status(500).
            json({success:"True", msg:"something went wrong"})
        }
        if(result){
            console.log(user[0].id, user[0].email);
            return   res.status(200).json({
                sucess:"true",
                msg:"successfully login",
                token:getJwtToken(user[0].id,user[0].email),
            });
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password Incorrect!",
              });

        }
       });
            
          }
          else {
              console.log("hello in err2");
             return res.status(409).json({sucess:false, msg:"Email not found"})
 }
         
}
catch(err){console.log(err);}
};


const jwt= require('jsonwebtoken');
const User=require('../Models/user');

const authenticate= async( req,res,next)=>{
    try{
     
         const token=req.header("Authorization");
         //console.log(token);
         const user=jwt.verify(token, process.env.TOKEN);
          User.findByPk(user.userId).then(user=>{
            req.user=user;
            next()
          }).catch(err=>{
            console.log(err);
          })

    }
    catch(err){
        console.log(err);
    }

}




module.exports=authenticate;
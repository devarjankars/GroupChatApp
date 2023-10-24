const Chat= require ('../Models/chat');
const User= require('../Models/user');
const path= require('path')


exports.sentMsg=async(req,res,next)=>{
    try{
        
   const result=await Chat.create({
     name:req.user.name,
     msg:req.body.msg,
     userId:req.user.id
   })
   res.status(200).json({msg:"success"});

    }
    catch(err){
        console.log(err);
        res.status(400).json({msg:"failed"});
    }
};

exports.getMsg=async(req,res,next)=>{
    try{
        
   const result= await Chat.findAll();
   res.status(200).json({msg:result});

    }
    catch(err){
        console.log(err);
        res.status(400).json({msg:"failed"});
    }
};

exports.getHomePage= async(req,res,next)=>{
    try{

        res.status(200).sendFile(path.join(__dirname, "../", "public", "views", "home.html"))

    }
    catch(err){
        console.log(err);
    }

}

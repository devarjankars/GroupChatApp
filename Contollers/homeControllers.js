const Chat= require ('../Models/chat');
const User= require('../Models/user');
const path= require('path')
const sequelize=require('../utils/database')
const { Op } = require("sequelize");




exports.sentMsg=async(req,res,next)=>{
    try {
        await Chat.create({
          name: req.user.name,
          msg: req.body.message,
          userId: req.user.id,
        });
        
        return res.status(200).json({ message: "Success!" });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error" });
      }
};

exports.getMsg=async(req,res,next)=>{
    try {
        const param = req.params.param;
        const messages = await Chat.findAll({
          where: {
            id: {
              [Op.gt]: param,
            },
          },
        });
        console.log(messages);
        return res.status(200).json({ messages: messages });
      } catch (error) {
        console.log(error);
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

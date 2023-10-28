const Chat= require ('../Models/chat');
const User= require('../Models/user');
const path= require('path')
const sequelize=require('../utils/database')
const { Op } = require("sequelize");
const Group= require('../Models/group')




exports.sentMsg=async(req,res,next)=>{
    try { const group = await Group.findOne({
      where: { name: req.body.groupName },
    });

        await Chat.create({
          name: req.user.name,
          msg: req.body.message,
          userId: req.user.id,
          groupId: group.dataValues.id,
        });
        
        return res.status(200).json({ message: "Success!" });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error" });
      }
};
//port 5000
const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("getMessages", async (groupName) => {
    try {
      console.log("message getting", groupName);
      const group = await Group.findOne({ where: { name: groupName } });
      console.log(group.dataValues.id);
      const messages = await Chat.findAll({
        where: { groupId: group.dataValues.id },
      });
      console.log(messages);
      io.emit("messages", messages);
    } catch (error) {
      console.log(error);
    }
  });
});
// exports.getMsg=async(req,res,next)=>{
//     try {
//         const param = req.params.param;
//         const messages = await Chat.findAll({
//           where: {
//             id: {
//               [Op.gt]: param,
//             },
//           },
//         });
//         console.log(messages);
//         return res.status(200).json({ messages: messages });
//       } catch (error) {
//         console.log(error);
//       }
// };

exports.getHomePage= async(req,res,next)=>{
    try{

        res.status(200).sendFile(path.join(__dirname, "../", "public", "views", "home.html"))

    }
    catch(err){
        console.log(err);
    }

}

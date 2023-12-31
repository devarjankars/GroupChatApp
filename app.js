require('dotenv').config();
const express=require('express');




const app=express()
const bodyParser= require('body-parser')


const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//db import
const Group= require('./Models/group');
const groupRouter= require('./routes/gruopRoute');
const sequelize= require('./utils/database');
const User= require('./Models/user');
const Chat = require('./Models/chat')

//routes import
const awsRoute= require('./routes/awsRoute');
const userRoutes= require('./routes/userRoute');
const homeRoutes=require('./routes/homeRoute');
const UserGroup = require('./Models/userGroup');


//rotes redirection
app.use('/',userRoutes);
app.use('/aws',awsRoute);
app.use('/home',homeRoutes);
app.use('/group', groupRouter);


//db assoction
User.hasMany(Chat,{ onDelete: "CASCADE", hooks: true });
Chat.belongsTo(User)
//user to group
User.hasMany(Group)

//group to chat
Group.hasMany(Chat);
Chat.belongsTo(Group)
//UserGroup at juction table 
UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);
Group.hasMany(UserGroup)

//db initalization
const job = require("./Job/corn");
job.start();

sequelize
  .sync(
//{ force:true}
  )
  
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));

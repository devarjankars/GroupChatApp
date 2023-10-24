require('dotenv').config();
const express=require('express');
const bodyParser= require('body-parser')


const app=express()


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db import
const sequelize= require('./utils/database');
const User= require('./Models/user');
const Chat = require('./Models/chat')

//routes import
const userRoutes= require('./routes/userRoute');
const homeRoutes=require('./routes/homeRoute');


//rotes redirection
app.use('/',userRoutes);
app.use('/home',homeRoutes);

//db assoction
User.hasMany(Chat);
Chat.belongsTo(User)

//db initalization

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));

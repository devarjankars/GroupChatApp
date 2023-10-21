require('dotenv').config();
const express=require('express');
const bodyParser= require('body-parser')


const app=express()


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db import
const sequelize= require('./utils/database');

//routes import
const userRoutes= require('./routes/userRoute');

//rotes redirection
app.use('/',userRoutes);

//db assoction


//db initalization

sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));

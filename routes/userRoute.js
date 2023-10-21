const express = require("express");
const router = express.Router();


//contoller import

const controller=require('../Contollers/userControllers');


//routes
router.get('/',controller.getSignUp)
router.post('/signUp',controller.postNewUserData)
router.get('/login',controller.getLogin)
router.post('/user/login',controller.LoginData);



module.exports=router;
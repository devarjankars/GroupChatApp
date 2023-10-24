const express = require("express");
const router = express.Router();
const controller=require('../Contollers/homeControllers')
const authy= require('../middleware/authy')


router.get('/',controller.getHomePage)

router.get('/getMsg',authy,controller.getMsg);
router.post('/sendMsg',authy,controller.sentMsg);

module.exports=router;
const express = require("express");
const router = express.Router();
const controller=require('../Contollers/homeControllers')



router.get('/',controller);

module.exports=router;
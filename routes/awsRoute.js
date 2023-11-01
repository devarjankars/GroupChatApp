const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const controller= require('../services/aws')
const authy= require('../middleware/authy')


router.post('/upload', authy, upload.single('file'),controller.addfileToGroup )

module.exports = router;
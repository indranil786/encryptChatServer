const express = require("express");
const router = express.Router();
const{sendEncryptMessage,getDecryptMessage,getAllMessages}=require('../controllers/message');
router.get("/",getAllMessages);
router.post('/encrypt/message',sendEncryptMessage );
router.post('/decrypt/message/:id',getDecryptMessage);
module.exports = router;
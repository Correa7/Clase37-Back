const express = require('express');
const cookieParser = require('cookie-parser');
const router = new express.Router();
const {sendEmail,sendMailWhitAttachments,sendResetPass,recoveryForm } = require('../controller/mail.controller');

router.use(cookieParser())
router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));

router.get('/', sendEmail);
router.get('/attachments', sendMailWhitAttachments);
router.get('/recovery', recoveryForm)
router.post('/resetInfo',sendResetPass ); 

module.exports = router;

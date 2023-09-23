const {Router} = require('express') 
const router = new Router()
const {sendEmail,sendMailWhitAttachments} = require('../controller/mail.controller')

router.get('/', sendEmail)
router.get('/attachments', sendMailWhitAttachments)

module.exports = router;

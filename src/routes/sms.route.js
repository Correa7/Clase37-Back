const {Router} = require('express')
const router = new Router()
const {sendSMS} = require('../controller/sms.controller')

router.get('/', sendSMS)

module.exports = router

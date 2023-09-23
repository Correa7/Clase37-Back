const {Router} = require('express')
const router = new Router()
const getLogger = require('../controller/logger.controller');

router.get('/', getLogger);

module.exports = router; 
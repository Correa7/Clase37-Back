const {Router} = require('express')
const router = new Router()
const {isAdmin} = require('../middlewares/auth.middleware')
const {mockProducts,mockUsers,mockGetError} = require('../controller/mocks.controller')


// router.get('/products',isAdmin, mockProducts)
// router.get('/users',isAdmin, mockUsers)
router.get('/products', mockProducts)
router.get('/users',mockUsers) 
router.get('*', mockGetError)

module.exports = router
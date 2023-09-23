const express = require('express')
const passport = require('passport')
const { isUser, isAdmin } = require("../middlewares/auth.middleware");
const{ getUser,
  getUserById,
  postUser,
  delUserById,
  putUserById} = require ('../controller/users.controller')


const {Router} = express
const router = new Router()
router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/', getUser)
router.get('/:id', getUserById)
router.post('/', passport.authenticate('register-passport',{failureRedirect:'/session/failed-register'}),postUser);
router.delete('/:id',delUserById);
router.put('/:id', putUserById);

module.exports = router



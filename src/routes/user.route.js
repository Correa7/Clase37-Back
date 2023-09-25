const express = require('express');
const passport = require('passport');
const { goToLogin,isAdmin } = require("../middlewares/auth.middleware");
const{ getUser,
  resetForm,
  resetPass,
  getUserById,
  rolUserById,
  postUser,
  delUserById,
  putUserById} = require ('../controller/users.controller');

const router = new express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/reset-form', resetForm)
router.post('/reset-password', resetPass)  
router.get('/',goToLogin, isAdmin, getUser);
router.get('/:id',goToLogin, isAdmin, getUserById);
router.post('/', passport.authenticate('register-passport',{failureRedirect:'/session/failed-register'}),postUser);
router.post('/premium/:uid',goToLogin, rolUserById );
router.delete('/:id',goToLogin, isAdmin, delUserById);
router.put('/:id',goToLogin, isAdmin, putUserById); 

module.exports = router;



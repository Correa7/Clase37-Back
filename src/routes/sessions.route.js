const express = require("express");
const passport = require("passport");
const { isValidPass } = require("../utils/bcrypt");
const { isUser, isAdmin } = require("../middlewares/auth.middleware");
const {sessionGetRegister,
  sessionPostRegister,
  sessionGetLogin,
  sessionPostLogin,
  sessionGetProfile,
  sessionGetLogout,
  sessionGetFailedRegister,
  sessionGetError  } = require ('../controller/sessions.controller')
const { Router } = express;
const router = new Router(); 

router.get('/register', sessionGetRegister);
router.post('/register',passport.authenticate("register-passport", {failureRedirect: "/sessions/failed-register",}),sessionPostRegister);
router.get("/login", sessionGetLogin);
router.post("/login",passport.authenticate("login-passport", {failureRedirect: "/session/register",}),sessionPostLogin);
router.get("/profile", sessionGetProfile);
router.get("/logout", sessionGetLogout);
router.get("/failed-register",sessionGetFailedRegister);
router.get('*', sessionGetError )

module.exports = router;

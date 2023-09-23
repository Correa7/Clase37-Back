const passport = require('passport')
const {getGithubCallBack} = require ('../controller/passport.controller')
const {Router} = require('express')
const router = new Router()


router.get('/github', passport.authenticate('auth-github', { scope: [ 'user:email' ] }));
router.get('/github/callback', passport.authenticate('auth-github', { failureRedirect: '/session/register' }),getGithubCallBack); 

module.exports = router
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {secret,gmailAccount, gmailAppPass} = require('../config/env.config')

const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user:gmailAccount,
        pass:gmailAppPass 
    }
})

const ForgotPassword = {
    async sendMail (req,res){
        if (req.body.email == "") {
            res.status(400).send({
                message:'Email required!'
            })
        }
        try{
            const user = await User.findOne({
                where:{
                    email:req.body.email
                }
            })
            if(!user) {
                return res.status(403).send({
                    message: 'Non-existent email'
                })
            }
            const token = jwt.sign({id:user.id}, secret,{expiresIn:'1h'})
            user.update({
                tokenResetPassword: token
            });
            const transporter = nodemailer.createTransport()

            const emailOptions ={
                from: 'Coder Test c_44705 - ' + gmailAccount,
                to: req.body.email,
                subject: "Correo de recuperacion de contraseña - Clase 37",
                text: `
                        <div>
                            <h3>Hello</h3>
                            <h3>We have sent you this email in response to your request to reset your password on company name.</h3><br>
                            <h3>To reset your password, please follow the link below:</h3>
                            <br>
                            <a class="btn btn-outline-primary mt-2 ms-2 me-2" href="http://localhost:8080/api/user/reset-form/${user.id}/${(token)}">Click here to Reset your Password</a>
                        </div>
                        
                `
            }


            let result = transporter.sendMail(emailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Error", payload: error })
                }
                res.cookie('CookieResetPass', 'cookiederecuperaciondepassword', {maxAge:3 * 60 * 1000}).render("resetInfo", {
                    style: "resetInfo.css",
                    title: "Info",
                    message: `Hi!  ${req.body.email}  : check your Email to reset your password.`,
                    message2:`Remember the Email link will expire in 1 hour!!!`
                  });
            })


        }
        catch (error){
            res.status(500).send({
                message:'Something went wrong :( !',
                error
            })
        }
    }
}
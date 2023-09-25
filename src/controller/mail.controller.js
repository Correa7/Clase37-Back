const nodemailer = require('nodemailer')
const {gmailAccount, gmailAppPass} = require('../config/env.config')


const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user:gmailAccount,
        pass:gmailAppPass 
    }
})
// verificar conexion con gmail
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

const mailOptions = {
    from: 'Coder Test - ' + gmailAccount,
    to: gmailAccount,
    subject: "Correo de prueba coderhouse - programacion backend clase 30",
    html: "<div><h1>Esto es un Test de envio de correos con Nodemailer!</h1></div>",
    attachments: []
}
const mailOptionsWithAttachments =  {
    from: 'Coder Test c_44705 - ' + gmailAccount,
    to: gmailAccount,
    subject: "Correo de prueba coderhouse - programacion backend clase 30 - attachments",
    html: `
            <div>
                <h1 style="color:green">Esto es un Test de envio de correos con Nodemailer!</h1>
                <p>Ahora usando imagenes: </p>
                <img src="cid:R"/>
                <img src="https://www.infobae.com/new-resizer/gY4FAo2c_hf_a0GeDoxOXPdureU=/arc-anglerfish-arc2-prod-infobae/public/CI5NWIC2B5BELN5T222GHNVJZE.jpg"/>
            </div>
    `,
    attachments: [
        {
            fileName: 'Reb',
            path:'src/public/images/R.jpg',
            cid: 'R'
        }
    ]

}
 const sendEmail = (req,res)=>{
     try{
        console.log('Send Mail')
        const result = transporter.sendMail(mailOptions, (error,info)=> {
            if (error){
                res.status(400).send({message:'Error!!', payload:error})
            }
            console.log('Message send: %s', info.messageId);
            res.send({ message: "Success!!", payload: info })
        })

    }catch(error){
        console.log(error)
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + gmailAccount });
    }
 }
const sendMailWhitAttachments = (req,res)=>{
    try{
        let result = transporter.sendMail(mailOptionsWithAttachments, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ message: "Error", payload: error })
            }
            // console.log('Message send: %s', info.messageId);
            res.send({ message: "Success!!", payload: info })
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error: error, message: "Could not send email from: " + gmailAccount });
    }
}
const recoveryForm = (req,res)=>{
    res.render('resetSendMail',{
        style: "recovery.css",
        title: "Recovery Pass Form"  
    })

} 
const sendResetPass = (req,res)=>{
    try{ 
        let clientEmail = req.body.email
        const emailRecoveryOptions ={
            from: 'Coder Test c_44705 - ' + gmailAccount,
            to: clientEmail,
            subject: "Correo de recuperacion de contraseña - Clase 37",
            html: `
                    <div>
                        <h3>Hello</h3>
                        <h3>We have sent you this email in response to your request to reset your password on company name.</h3><br>
                        <h3>To reset your password, please follow the link below:</h3>
                        <br>
                        <a class="btn btn-outline-primary mt-2 ms-2 me-2" href="http://localhost:8080/api/user/reset-form">Click here to Reset your Password</a>
                    </div>
                    
            `
        }
        let result = transporter.sendMail(emailRecoveryOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ message: "Error", payload: error })
            }
     
            // res.send({ message: "Success!!", payload: info })             {maxAge:60 * 60 * 1000}  === 1hs
            res.cookie('CookieResetPass', 'cookiederecuperaciondepassword', {maxAge:3 * 60 * 1000}).render("resetInfo", {
                style: "resetInfo.css",
                title: "Info",
                message: `Hi!  ${clientEmail}  : check your Email to reset your password.`,
                message2:`Remember the Email link will expire in 1 hour!!!`
              });
        })
    } 
    catch(error){
        console.log(error)
        res.status(500).send({ error: error, message: "Could not send email from: " + gmailAccount });
    }
}


module.exports = {
    sendEmail,
    sendMailWhitAttachments,
    recoveryForm,
    sendResetPass 
}
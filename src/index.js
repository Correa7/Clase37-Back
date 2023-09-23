const express = require('express'); 
const app = express();
const {port, mongoUrl, secret} = require('./config/env.config');

//Mongo
const DataBase= require('./utils/mongo');
const Product= require('./dao/mongo/models/products.model');
const Chat= require('./dao/mongo/models/chat.model');

// Public Folder
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));

// Sessions requires
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
app.use(cookieParser()); 
app.use(session({
    store: MongoStore.create({
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        // ttl:'',
        mongoUrl:mongoUrl+'ecommerce'
    }),
    secret:secret,
    resave:false,
    saveUninitialized:false

}));
// Passport Passport-Local
const initializePassport = require('./config/passport.config');
const passport = require('passport');
initializePassport(); //Importante que este antes de el paasport.initialize
app.use(passport.initialize());
app.use(passport.session());

// logger
const addLogger = require('./utils/logger');
app.use(addLogger);

// Routes
// Views
// const routesViews = require('./routes/views.route');
// app.use('/', routesViews)
//Products
const routesProduct = require('./routes/products.route');
app.use('/api/product', routesProduct);
const viewsProducts= require('./routes/products.route.views');
app.use('/products',viewsProducts);
//Cart
const routesCart = require('./routes/cart.route'); 
app.use('/api/cart', routesCart);
const viewsCart = require('./routes/cart.route.view');
app.use('/cart', viewsCart);  
// Users
// const routesUsers = require('./routes/user.route');
// app.use('/api/user',routesUsers);
// Sessions
const sessions = require('./routes/sessions.route');
app.use('/session', sessions);
const apiSession = require('./routes/sessions.route.api');
app.use('/api/session/', apiSession);
// auth.pasport
const authPassport = require('./routes/passport.route');
app.use('/auth', authPassport);
//Real time Products
const routesRealTime = require('./routes/realTimeProducts.route');
app.use('/realTimeProducts', routesRealTime);
// Chat
const routesChat = require('./routes/chat.route');
app.use('/chat', routesChat);
// Mailing
const emailRoute = require('./routes/email.route');
app.use('/api/email', emailRoute);
// Twilio
const smsRoute = require('./routes/sms.route');
app.use('/api/sms', smsRoute);
// Mcks
const mocksRoute = require('./routes/mocks.route');
app.use('/api/mocks', mocksRoute);
// Logger
const loggerRoute = require('./routes/logger.route');
app.use('/api/logger',loggerRoute);

// Handlebars
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views/');

// Sockets set
const {Server} = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

const messages = [] 
io.on('connection', (socket)=>{
    console.log('New User connected')
    socket.emit('wellcome','Wellcome new User') 

    // Comunicacion con realTimeProduct.js
    socket.on('addProduct' ,(data)=>{
        let product= new Product(data)
        product.save()
        .then(pr=>{

            Product.find({}).lean()
            .then(pr=>{
                io.sockets.emit('newData', pr)
            })
            .catch(err=>{
                res.status(500).send(
                    console.log('Error loading product')
                )
            })
        })
        .catch(err=>{
            res.status(500).send(
                console.log('Error loading product')
            )
        })   

    })
    socket.on('delProduct',(data)=>{
        let {id} =data
        console.log(id)
        Product.deleteOne({_id:id})
        .then(pr =>{ 
            Product.find({}).lean()
            .then(pr=>{
                io.sockets.emit('newData', pr)
            })
            .catch(err=>{
                res.status(500).send(
                    console.log('Error loading product')
                )
            })
        })
        .catch(err=>{
            res.status(500).send(
                console.log('Error Delete product')
            )
        })
        
    })

    // Chat sockets
    socket.on('new-message', (data)=>{
        
            Chat.findOne({user:data.user }).exec()
            .then(pr=>{

                if(pr){
                    Chat.updateOne({_id:pr._id},data)
                    .then(pr=>{
                        messages.push(data)
                        io.sockets.emit('messages-all', messages)
                    })
                    .catch(err=>{
                        console.log('Error send message')   
                    })
                }
                else{
                    let chat= new Chat(data)
                    chat.save()
                    .then(pr=>{
                    messages.push(data)
                    io.sockets.emit('messages-all', messages)
                    })
                    .catch(err=>{
                        console.log('Error send message')   
                    })
                }
            })
    })

});

app.get('/', (req,res)=> {  
    if(req.session.user){
        let session = req.session.user
        let rol = req.session.user.rol 
        const data={
            title:'ecommerce backend',
            message:'Ecommerce backend  Index',
            style:'style.css',
        }
        data[rol]= session
        res.render('index', data) 
    }
    else{
        const data={
            title:'ecommerce backend',
            message:'Ecommerce backend  Index',
            style:'style.css',
        }
        res.render('index', data) 
    }
});

server.listen(port, ()=>{
    console.log('Server is runing on port: ' + port)
    const database= new DataBase(mongoUrl)
    database.connect() 
});


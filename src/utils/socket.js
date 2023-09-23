const Product= require('./dao/mongo/models/products.model')
const Chat= require('./dao/mongo/models/chat.model')
// Sockets set
const {Server} = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = new Server(server)

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

})
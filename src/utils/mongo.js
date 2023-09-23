const mongoose= require('mongoose')
class ManagerMongo {

    constructor (url){ 
        this.url = url
    } 
  
        connect(){
            return mongoose.connect(this.url+'ecommerce', {useUnifiedTopology:true, useNewUrlParser:true})
            .then(connect =>{ console.log ('conexion exitosa')})
            .catch(err=>{console.log(err)})
        }
    
}

module.exports = ManagerMongo 
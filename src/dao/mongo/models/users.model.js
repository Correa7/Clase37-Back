const mongoose= require('mongoose')
const userPaginate = require('mongoose-paginate-v2')

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        unique:false,
        required:true
    }, 
    lastName:{
        type:String,
        unique:false,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    age:{
        type:Number,
        unique:false,
        required:true,
        default:18
    },
    password:{
        type: [String, null],
        max: 100,
    },
    rol:{
        type:String,
        required:true,
        default:'User'
    },
    cart: {
        type: String,
        required: false
      }
},{ versionKey: false })

const userModel = mongoose.model('User', userSchema)
module.exports = userModel



const mongoose= require('mongoose')
const cartPaginate = require('mongoose-paginate-v2')
const uuid4 = require('uuid4') 

const CartSchema = new mongoose.Schema({  
  products: [{
    idProduct: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'  
       },
    quantity: {
      type: Number 
       }, 
    _id: false 
   }] 
    
  },{ versionKey: false });
  // CartSchema.pre('find', function(){ 
  //   this.populate('products.idProduct')
  // })
  // CartSchema.pre('findOne', function(){  
  //   this.populate('products.idProduct')
  // })
  CartSchema.pre('getCart', function(){ 
    this.populate('docs.products')
  })
  // CartSchema.plugin(cartPaginate);
  
const CartModel= mongoose.model('cart', CartSchema)
module.exports = CartModel 
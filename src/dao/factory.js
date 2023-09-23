const {persistence} = require('../config/env.config')
const cartModel = require('./mongo/classes/carts.dao');
const productModel = require('./mongo/classes/products.dao.js');
const chatModel = require('./mongo/classes/chat.dao.js');
const ticketModel = require('./mongo/classes/tickets.dao.js');
const userModel = require('./mongo/classes/users.dao.js')
  
switch (persistence) {
    case 'MONGO':
      console.log('Persistence with Mongo')
      CartMethods = cartModel;
      ProductMethods = productModel;
      ChatMethods = chatModel;
      TicketMethods = ticketModel;
      UserMethods = userModel; 
  
      break;
    case 'FS':
      console.log('Persistence with FileSystem');
      const cartManager = require('./fs/classes/CartsManager.js');
      CartMethods = cartManager;
      const productManager = require('./fs/classes/ProductManager.js');
      ProductMethods = productManager;
  
      break;
    default:
      break;
  }
  module.exports = {
    CartMethods,
    ProductMethods,
    ChatMethods,
    TicketMethods,
    UserMethods
  }
const Ticket = require('../models/ticket.model')
const uuid4= require('uuid4')

class TicketService {
    async getAll() {
        const result = await Ticket.find(); 
        return result;
      }
      async getById(_id) {
        const result = await Ticket.findOne({ _id: _id });
        return result;
      }
      async createOne(data) { 
        const{amount, email} = data
        let newData = {
          code:uuid4(),
          purchase_datetime:new Date(Date.now()),
          amount: amount,
          purchaser: email
        }
        const result = await Ticket.create(newData);
        return result;
      }
      async deletedOne(_id) {
        const result = await Ticket.deleteOne({ _id: _id });
        return result;
      }
    //   async updateOne(_id, first_name, last_name, email, age, password, rol) {
    //     const upDateTicket = await Ticket.updateOne(
    //       { _id: _id },
    //       { first_name, last_name, email, age, password, rol }
    //     );
    //     return upDateTicket;
    //   }
}
module.exports= TicketService
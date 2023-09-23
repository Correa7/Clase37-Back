const UserModel = require ('../models/users.model.js');
 

class UserClass{
    async find(){
        const users = await UserModel.find({})
        return users
    }
}
const userModel = new UserClass()
module.exports = userModel  

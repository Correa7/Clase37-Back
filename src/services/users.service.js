const { UserMethods } = require('../dao/factory.js');

class UserService{
    async getAll(){
        try {
            const users = await UserMethods.find()
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
module.exports = UserService
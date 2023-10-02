const UserService = require('../services/users.service');
const Service = new UserService()


const getUser = async (req,res)=>{
    try{
        const users = await Service.getAll();
        return res.status(200).json({
            status: 'success',
            msg: 'Users founds',
            data: users,
        })
    }
    catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
}

const getUserById = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user= await  Service.getById(uid)
        return user? 
        res.status(200).json({
            status: 'success', 
            msg: 'User Get by ID',
            data:user,
        }):
        res.status(200).json({
            status: 'error',
            msg: 'User not found',                                                             
            data: user,
        })
    } 
    catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
}

const postUser = (req, res) => {
    res.redirect('/session/login')
} 

const rolUserById = async (req,res)=>{
    try{
        let _id = req.params.uid
        const user = await  Service.getById(_id)
        if(user.rol === 'User'){
            user.rol= 'Premium' 
            await Service.updateOne(_id,user) 
            return res.status(201).json({
                status: 'success',
                msg: 'User update rol: Premium',
            });
 
        }else{
            user.rol= 'User'
            await Service.updateOne(_id,user) 
            return res.status(201).json({
                status: 'success',
                msg: 'User update rol: User',
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
}

const delUserById =  async (req, res) => {
    try {
    const uid = req.params.uid;
    await Service.deletedOne(uid)
    return res.status(200).json({
        status: 'success',
        msg: 'User deleted',
        data: {},
    });
    } catch (e) {
    console.log(e);
    return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
    });
    }
}

const putUserById = async (req, res) => { 
    try {
        const uid = req.params.uid;
        const data= req.body
        await Service.updateOne(uid,data)
        return res.status(201).json({
            status: 'success',
            msg: 'User update',
            data:data,
        });
    } 
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
}

 
module.exports = {
    getUser,
    getUserById,
    postUser,
    delUserById,
    putUserById,
    rolUserById
}

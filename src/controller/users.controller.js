// const UserServices = require('../dao/mongo/services/users.services')
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
        const _id = req.params.id;
        const user= await  Service.getById(_id)
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
        let id = req.params.uid
        const user= await  Service.getById(id)
        if(user.rol === 'User'){
            user.rol='Premium'
            await Service.updateOne(id, user.firstName, user.lastName,  user.email, user.age, user.password, user.rol)
            return res.status(201).json({
                status: 'success',
                msg: 'User update rol: Premium',
            });

        }else{
            user.rol='User'
            await Service.updateOne(id, user.firstName, user.lastName,  user.email, user.age, user.password, user.rol)
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
    const _id = req.params.id;
    await Service.deletedOne(_id)
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
        const _id = req.params.id;
        const { firstname, lastname,  email, age, password, rol } = req.body;
        const data= req.body
        console.log(_id)
        await Service.updateOne(_id, firstname, lastname,  email, age, password, rol)
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
const resetForm = (req,res)=>{    
    let cookie= req.cookies
    console.log(JSON.stringify(cookie))
    if(JSON.stringify(cookie).length != 0){
        res.render('resetPass',{
            style: "resetPass.css", 
            title: "Recoveru Pass",
            message:`Esto es la cookie: ${JSON.stringify(cookie)}` 
        })
    }
    else{
        res.render('resetSendMail',{
            style: "recovery.css",
            title: "Recovery Pass Form",  
            message:"Your password recovery link has expired. Please try again."
        })
    }
}
const resetPass = (req,res)=>{
    let { email, password } = req.body
    console.log(email)
    console.log(password)
    res.send('Hola');
}
 
module.exports = {
    getUser,
    getUserById,
    postUser,
    delUserById,
    putUserById,
    rolUserById,
    resetForm,
    resetPass
}

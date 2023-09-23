const {ProductMethods} = require('../dao/factory')
const getRealTimeProducts = (req, res) => {
  let session = req.session.user
  let rol = req.session.user.rol  
  ProductMethods.find({}) 
    .then((pr) => {
      const data={ 
        products: pr,
        style: "realtimeproducts.css",
        title: "RealTimeProducts",
    }
      data[rol] = session
      res.render("realTimeProducts",data);
    })
    .catch((err) => {
      res.status(500).send(console.log("Error loading product"));
    });
}

const getRealTimeError = () => {
  res.render("error404", {
    style: "error404.css",
    title: "Error 404",
  });
}


module.exports = {
  getRealTimeProducts,
  getRealTimeError
}



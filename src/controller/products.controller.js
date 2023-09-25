const ProductService  = require ('../services/products.service.js');
const ProductDTO = require ('../dao/DTO/product.dto.js'); 
const productService = new ProductService();
// const productDTO = new ProductDTO();
const CustomError = require('../services/errors/CustomError.js');
const EErrors = require('../services/errors/errors-enum.js');
const { generateProductErrorInfo } = require('../services/errors/messages/creation-error.messages.js');

 
 

const getWithQuerys = async (req,res) =>{
      try {
          let {limit = 4, page = 1, query, sort} = req.query
          if(sort && (sort !== 'asc' && sort !== 'desc')){
              sort = ''
          } 
          const payload = await productService.getAll(page, limit, sort, query);
          res.status(200).json({
              status: "success",
              payload: payload
          })
      } catch (error) {
          res.status(400).json({
              status: "error",
              error: error.message
          })     
      }
  }
const getProductById = async (req, res) =>{
      try {
          const id = req.params.id;
          const product = await productService.getProductById(id);
          res.status(200).json({status:"success",
          message: `Product with id:${id}`, payload: product})
  
      } catch (error) {
          res.status(400).json({status: "error",
              error: error.message
          })
      }
  }
const addProduct = async (req, res) =>{
      try {
          const product = req.body
          product.owner = req.session.user.email
          let user = req.session.user.email
          console.log(user)
          const { title, description, price, thumbnail,code,stock,category, status } = req.body;
        if (!title || !description || !price || !code || !stock || !category) {
            // creamos custom Error 
            CustomError.createError({
                name: "Product creation error",
                cause: generateProductErrorInfo({ title, description, price,code,stock,category }),
                message: "Error to create Product - TEST",
                code: EErrors.INVALID_TYPES_ERROR
            })
        } 
          const productToAdd = new ProductDTO(product)
          await productService.addProduct(productToAdd)
          res.status(201).json({status:"success",message: 'Added successfuly', payload: product })
      } catch (error) {
          console.error(error);
          res.status(400).json({status: "error", error: error.code, message: error.message})
      }
  }
const deleteProduct = async (req, res) =>{
      try {
          let id = req.params.id;
          let rol = req.session.user.rol
          let email = req.session.user.email
          if(rol === 'Premium'){
            let productFound = await productService.getProductById(id)
            if(productFound.owner === email){
              const product = await productService.deleteProduct(id);
              res.status(200).json({status:"success", message: `The product with id: ${id} was deleted succesfully!`, payload: product
            })
              }
              else{
                res.status(400).send({stasus:'error', message:`The product with id: ${id} could not be removed!`})
              }
          }
          else{
            const product = await productService.deleteProduct(id);
            res.status(200).json({status:"success", message: `The product with id: ${id} was deleted succesfully!`, payload: product
            })
          }
      } catch (error) {
          res.status(400).json({
              status: "error",
              error: error.message
          }) 
      }
  }
const updateProduct = async (req, res) =>{
      try {
          const id = req.params.id;
          const productByUser = req.body
          const product = await productService.updateProduct(id, productByUser);
          res.status(200).json({status: "success", message: `The product with id: ${id} was updated succesfully!`, payload: product
          }) 
      } catch (error) {
          res.status(400).json({
              status: "error",
              error: error.message
          }) 
      }
  }

const addManyProducts = async (req, res) => {
      try {
        const data = req.body;
        const productCreated = await productService.createMany(data);
        return res.status(201).json({
          status: "success",
          msg: "product created",
          data: productCreated,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          status: "error",
          msg: "something went wrong :(",
          data: {},
        });
      }
    }
const getProductError = (req,res) => {
  res.render("error404", {
    style: "error404.css",
    title: "Error 404",
  });
}
module.exports ={
  getWithQuerys,
  getProductById,
  addProduct,
  addManyProducts,
  deleteProduct,
  updateProduct,
  getProductError
 }

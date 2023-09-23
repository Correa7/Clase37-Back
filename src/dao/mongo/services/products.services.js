const Product = require("../models/products.model");

// Agregar metodo getAllproduct solo con un Product.find()

class ProductServices { 
  
  async getAllProducts () {
    const result = await Product.find();
    return result;
  }
  async getAll(page, limit, sort, data) {
    if (sort) {
      const product = await Product.paginate(
        {},
        { limit: limit || 8, page: page || 1, sort: { price: sort || "asc" } }
      );
      return product;
    } else if (data) {
      const product = await Product.paginate(data, {
        limit: limit || 8,
        page: page || 1,
      });
      return product;
    } else {
      const product = await Product.paginate(
        {},
        { limit: limit || 8, page: page || 1 }
      );
      return product;
    }
  }
  async getById(_id) {
    const result = await Product.findOne({ _id: _id });
    return result;
  }
  async createOne(data) {
    const result = await Product.create(data);
    return result;
  }
  async createMany(data) {
    const result = await Product.insertMany(data);
    return result;
  }
  async deletedOne(_id) {
    const result = await Product.deleteOne({ _id: _id });
    return result;
  }
  async updateOne(
    _id,
    title,
    description,
    thumbnail,
    code,
    stock,
    category,
    status
  ) {
    const result = await Product.updateOne(
      { _id: _id },
      { title, description, thumbnail, code, stock, category, status }
    );
    return result;
  }
}
module.exports = ProductServices;

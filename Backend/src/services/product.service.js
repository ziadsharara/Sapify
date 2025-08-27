import { ODataController, ODataQuery } from 'odata-v4-server';
import Product from '../models/product.model.js';

class ProductController extends ODataController {
  async find(query) {
    try {
      const products = await Product.find(query);
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id, query) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async insert(body) {
    try {
      const product = new Product(body);
      const savedProduct = await product.save();
      return savedProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id, body) {
    try {
      const product = await Product.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductController;

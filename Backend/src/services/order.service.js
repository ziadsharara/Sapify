import { ODataController } from 'odata-v4-server';
import Order from '../models/order.model.js';

class OrderController extends ODataController {
  async find(query) {
    try {
      const orders = await Order.find(query).populate(
        'items.product createdBy'
      );
      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id, query) {
    try {
      const order = await Order.findById(id).populate(
        'items.product createdBy'
      );
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async insert(body) {
    try {
      const order = new Order(body);
      const savedOrder = await order.save();
      return savedOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id, body) {
    try {
      const order = await Order.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id) {
    try {
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        throw new Error('Order not found');
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default OrderController;

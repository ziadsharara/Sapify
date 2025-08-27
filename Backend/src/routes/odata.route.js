import express from 'express';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';

const router = express.Router();

// OData service root
router.get('/', (req, res) => {
  res.json({
    '@odata.context': 'http://localhost:3000/odata/$metadata',
    value: [
      {
        name: 'Products',
        kind: 'EntitySet',
        url: 'Products',
      },
      {
        name: 'Orders',
        kind: 'EntitySet',
        url: 'Orders',
      },
      {
        name: 'Users',
        kind: 'EntitySet',
        url: 'Users',
      },
    ],
  });
});

// Get all products
router.get('/Products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      '@odata.context': 'http://localhost:3000/odata/$metadata#Products',
      value: products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/Products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({
      '@odata.context':
        'http://localhost:3000/odata/$metadata#Products/$entity',
      ...product._doc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders
router.get('/Orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product createdBy');
    res.json({
      '@odata.context': 'http://localhost:3000/odata/$metadata#Orders',
      value: orders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/Orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'items.product createdBy'
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({
      '@odata.context': 'http://localhost:3000/odata/$metadata#Orders/$entity',
      ...order._doc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/Users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      '@odata.context': 'http://localhost:3000/odata/$metadata#Users',
      value: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single user
router.get('/Users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      '@odata.context': 'http://localhost:3000/odata/$metadata#Users/$entity',
      ...user._doc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

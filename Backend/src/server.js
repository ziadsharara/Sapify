import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './config/database.js';
import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import odataRoutes from './routes/odata.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// OData endpoint
app.use('/odata', odataRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sapify Backend API! 🚀',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      odata: '/odata',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Sapify backend server running on port ${PORT}`);
});

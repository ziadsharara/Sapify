import { ODataServer } from 'odata-v4-server';
import ProductController from './product.service.js';
import OrderController from './order.service.js';
import UserController from './user.service.js';

// Create OData server instance
const server = new ODataServer();

// Register controllers
server.addController('Products', ProductController);
server.addController('Orders', OrderController);
server.addController('Users', UserController);

// Set namespace
server.namespace = 'Sapify';

export default server;

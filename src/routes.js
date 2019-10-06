const express = require('express');

const authMiddleware = require('./app/middlewares/auth')

const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const ProductController = require('./app/controllers/ProductController');
const SaleController = require('./app/controllers/SaleController');


const routes = express.Router();

// ================== Free routes =====================

//User paths
routes.post('/users', UserController.store);

//Auth paths
routes.post('/auth', AuthController.login);

//Product paths
routes.get('/products', ProductController.getAllProducts);
routes.get('/products/:product_id', ProductController.getProduct);

// ================= With permission only ================
routes.use(authMiddleware);

//User paths
routes.get('/users/:user_id', UserController.getUser);
routes.get('/users', UserController.getAllUsers);
routes.post('/users/addToFavorites/:product_id', UserController.addToFavorites);
routes.post('/users/addToCart/', UserController.addToCart);

//Product paths
routes.post('/products', ProductController.newProduct);

//Sale paths
routes.post('/sales', SaleController.newSale);
routes.get('/sales', SaleController.getAllSales);
routes.get('/sales/:sale_id', SaleController.getSale);


module.exports = routes;
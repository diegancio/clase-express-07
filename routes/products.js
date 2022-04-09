const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

// Middleware
const mdProducts = require('../middlewares/pruebaProductos');
const mdAutenticacion = require('../middlewares/autenticacion');

// http://localhost:3000/products
router.get('/', mdProducts, productsController.allProducts);

// http://localhost:3000/products/create
router.get('/create', mdProducts, productsController.createProduct);

// http://localhost:3000/products/pokemons
router.get('/pokemons', productsController.pokemons);

// http://localhost:3000/products/auth/:name
router.get('/auth/:name', mdAutenticacion, productsController.auth);

// http://localhost:3000/products/:id
router.get('/:id', productsController.oneProduct);

module.exports = router;
const express = require('express');
const app = express();

const mongoose = require ('mongoose');

const mongoDB= 'mongodb://localhost/testing';
mongoose.connect (mongoDB, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const path = require('path');
// console.log( path.join('controllers', 'products.js') );
// console.log( path.dirname('controllers/products.js') );
// console.log( path.extname('controllers/products.js') );

app.listen(3000, function() {
	console.log('Servidor andando => puedes ir http://localhost:3000');
});

// Configuración para recibir información desde los formularios
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );

// Seteando el motor de plantillas
app.set('view engine', 'ejs');

// Seteando la carpeta de archivos públicos
app.use( express.static(__dirname + '/public') );

// Middleware de prueba
const middlewareDePrueba = require('./middlewares/prueba');
app.use(middlewareDePrueba);

// Rutas

app.get('/', function (req,res) {
	mongoose.connection.db.collection('user').find({}).toArray(function(err,docs){
		return res.send(docs);
	})
	
})

app.get('/about', function(req, res) {
	return res.send('Esta es la sección quienes somos');
})

app.get('/login', function(req, res) {
	return res.send('Logueate primero que nada');
})

const productsRoutes = require('./routes/products');
app.use('/products/', productsRoutes);

const moviesRoutes = require('./routes/movies');
app.use('/movies/', moviesRoutes);

// 404 Error
const middleware404 = require('./middlewares/404NotFound');
app.use(middleware404);
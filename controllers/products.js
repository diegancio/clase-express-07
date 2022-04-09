const fetch = require('node-fetch');

let productsList = ['Smart TV', 'Cellphone', 'Tablet', 'Mouse', 'Teclado', 'Pantalla'];

const controller = {
	allProducts: (req, res) => {
		return res.render('products', { listadoDeProductos: productsList });
	},
	createProduct: (req, res) => {
		return res.send('Ahora vas a crear un producto');
	},
	oneProduct: (req, res) => {
		let idProduct = req.params.id;
		let productoBuscado = productsList[idProduct];
		return res.render('detalleProducto', { infoDelProducto: productoBuscado });
	},
	pokemons: (req, res) => {
		fetch('https://pokeapi.co/api/v2/ability/')
			.then(response => response.json())
			.then(data => {
				return res.render('pokemons', { listadoPokemons: data.results });
			})
	},
	auth: (req, res) => {
		return res.send('Hola visitante autenticado');
	}
}

module.exports = controller;

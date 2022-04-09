const fs = require('fs');
const Movie = require ('../database/models/Movie');

const controller = {
	allMovies: (req, res) => {
		let moviesInDb = fs.readFileSync('./data_base/estrenos-2021.json', {encoding: 'utf8'});
		let moviesFinal = JSON.parse(moviesInDb);
		return res.render('movies', { movies:  moviesFinal });
	},
	createMovie: (req, res) => {
		// 1. Leer el archivo json
		let moviesInDb = fs.readFileSync('./data_base/estrenos-2021.json', { encoding: 'utf8' });
		let moviesFinal = JSON.parse(moviesInDb);

		// 2. Preguntamos si el archivo tiene información
		if (moviesFinal.length > 0) {
			moviesFinal.push({
				title: 'Black Widow',
				genre: 'Acción',
				poster: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fmarvelcinematicuniverse%2Fimages%2F1%2F10%2FBlack_Widow_-_The_Official_Movie_Special.jpg'
			});
		} else {
			// Insertamos la 1er película
			moviesFinal.push({
				title: 'Kimetsu no Yaiba',
				genre: 'Anime',
				poster: 'https://picfiles.alphacoders.com/244/244064.jpg'
			})
		}

		// 3.Convertir el array de peliculas a string JSON
		let movieJson = JSON.stringify(moviesFinal, null, ' ');
		
		// 4. Volver a guardar todo el archivo JSON
		fs.writeFileSync('./data_base/estrenos-2021.json', movieJson);
		
		return res.send('Vamos a crear una película');
	},

	formToCreate: (req, res) => {
		return res.render('form-to-create-movies');
	},

	storeInDB: (req, res) => {
		// Antes de guardar la película, vamos a preguntar si vino información
		if (req.body.title !== '' && req.body.genre !== '' && req.file !== undefined) {
			// 1. Leer el archivo json
			let moviesInDb = JSON.parse(fs.readFileSync('./data_base/estrenos-2021.json', { encoding: 'utf8' }));

			// 2. Insertamos la nueva película en el array de todas las películas
			moviesInDb.push({
				title: req.body.titulo,
				genre: req.body.genero,
				poster: req.file.filename,
			});

			// 3.Convertir el array de peliculas a string JSON
			let movieJson = JSON.stringify(moviesInDb, null, ' ');

			// 4. Volver a guardar todo el archivo JSON
			fs.writeFileSync('./data_base/estrenos-2021.json', movieJson);

			return res.redirect('/movies');
		}

		// Acá llega si no entra al IF
		// Como llegó hasta aquí, necesitamos avisar que hubo errores
		return res.render('form-to-create-movies', {
			error: 'El formulario tiene campos vacíos, por favor revisa de nuevo'
		});
	}
}

module.exports = controller;
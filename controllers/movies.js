const fs = require('fs');
const Movie = require ('../database/models/Movie');

const controller = {
	allMovies: (req, res) => {
		Movie.find ({}, (error, documents) => {
			if (error) {
				return res.status(500).json(error);
			}
			return res.render ('movies', { movies: documents});
		})
	},

	formToCreate: (req, res) => {
		return res.render('form-to-create-movies');
	},

	storeInDB: (req, res) => {
		// Antes de guardar la película, vamos a preguntar si vino información
		if (req.body.title !== '' && req.body.genre !== '' && req.body.rating !== '' && req.file !== undefined) {
		
			Movie.create({
			title: req.body.title,
			genre: req.body.genre,
			rating: req.body.rating,
			poster: req.file.filename
		},(error,movie) => {
			if (error) {
				return res.status(500).json(error);
			}
			return res.redirect('/movies');
		})

			
		} else {
			// Acá llega si no entra al IF
		// Como llegó hasta aquí, necesitamos avisar que hubo errores
		return res.render('form-to-create-movies', {
			error: 'El formulario tiene campos vacíos, por favor revisa de nuevo'
		});

		}

		
	}
}

module.exports = controller;
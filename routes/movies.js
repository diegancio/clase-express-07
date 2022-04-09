const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');
const uniqid = require('uniqid');
const randomWords = require('random-words');

const storage = multer.diskStorage({
	destination: function (req, file, cb) { 
		cb(null, './public/images/posters'); // En este directorio se guardarán los posters
	},
	filename: function (req, file, cb) { 
		let finalName = uniqid() + randomWords({ exactly: 5, join: '-' }) + Date.now() + path.extname(file.originalname);
		cb(null, finalName); // Nombre con el que se guardará el archivo
	}
});

const upload = multer({ storage: storage });

const controller = require('../controllers/movies');

// GET - http://localhost:3000/movies
router.get('/', controller.allMovies);

// GET - http://localhost:3000/movies/create
router.get('/create', controller.formToCreate);

// POST - http://localhost:3000/movies/create
router.post('/create', upload.single('poster'), controller.storeInDB);

module.exports = router;
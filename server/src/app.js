// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routerUsers = require('./controllers/routeUsers');
const routerPets = require('./controllers/routePets');
const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors');
const connectToDatabase = require('./middleware/connectToDataBase');
connectToDatabase();

const app = express();
app.set('appName', 'API');
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// Ruta de bienvenida
app.get('/', (_req, res, next) => {
	try {
		res.send('¡Hola, mundo!').end();
	} catch (err) {
		next(err);
	}
});
app.use('/users', routerUsers);
app.use('/pets', routerPets);
app.use(notFound);
app.use(handleErrors);

module.exports = app;

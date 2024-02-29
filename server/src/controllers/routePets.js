/**
 * Ruta y controlador de Mascota
 *
 * Destinado a la definición de endpoints,
 * middlewares de protección de ruta
 * y especificación de campos a aceptar
 */

const { Router } = require('express');
const {
	createPet,
	deletePet,
	reportPet,
	searchPet,
	searchPets,
	updatePet,
} = require('../services/petService');
const userExtractor = require('../middleware/userExtractor');
const route = Router();

// Ruta para crear una nueva mascota
route.post('/', userExtractor, async (req, res, next) => {
	try {
		const owner = req.user.userId;
		const { body } = req;
		const newData = {
			nickName: body.nickName,
			breed: body.breed,
			birth: body.birth,
			images: body.images,
			description: body.description,
			lost: body.lost,
		};
		const newPet = await createPet({ ...newData, owner });
		res.status(201).json(newPet).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para obtener mascotas perdidas
route.get('/lost', async (req, res, next) => {
	try {
		const { page, limit } = req.query;
		const pets = await searchPets({ filter: 'lost', page, limit });
		res.status(200).json(pets).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para reportar mascota encontrada
route.post('/report/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const data = {
			heroName: body.heroName,
			email: body.email,
			telephone: body.telephone,
			description: body.description,
		};
		const report = await reportPet({ ...data, id });
		res.status(201).json(report).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para obtener una mascota por ID
route.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const pet = await searchPet(id);
		res.status(200).json(pet).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para actualizar una mascota por ID
route.put('/:id', userExtractor, async (req, res, next) => {
	try {
		const owner = req.user.userId;
		const { id } = req.params;
		const { body } = req;
		const updateData = {
			nickName: body.nickName,
			breed: body.breed,
			birth: body.birth,
			images: body.images,
			description: body.description,
			lost: body.lost,
		};
		const updatedPet = await updatePet({ ...updateData, id, owner });
		res.status(200).json(updatedPet).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para eliminar una mascota por ID
route.delete('/:id', userExtractor, async (req, res, next) => {
	try {
		const owner = req.user.userId;
		const { id } = req.params;
		const data = await deletePet({ id, owner });
		res.status(200).json(data).end();
	} catch (err) {
		next(err);
	}
});

module.exports = route;

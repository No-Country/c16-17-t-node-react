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
	searchPet,
	updatePet,
} = require('../services/petService');
const userExtractor = require('../middleware/userExtractor');
const route = Router();

// Ruta para crear una nueva mascota
route.post('/', userExtractor, async (req, res, next) => {
	try {
		owner = req.user.userId;
		const { body } = req;
		const newData = {
			nickName: body.nickName,
			breed: body.breed,
			images: body.images,
			birth: body.birth,
		};
		const newPet = await createPet({ ...newData, owner });
		res.status(201).json(newPet).end();
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
route.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const updateData = {
			nickName: body.nickName,
			breed: body.breed,
			birth: body.birth,
			images: body.images,
		};
		const updatedPet = await updatePet(id, updateData);
		res.status(200).json(updatedPet).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para eliminar una mascota por ID
route.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const data = await deletePet(id);
		res.status(200).json(data).end();
	} catch (err) {
		next(err);
	}
});

module.exports = route;

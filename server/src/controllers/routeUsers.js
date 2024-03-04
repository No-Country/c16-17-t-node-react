/**
 * Ruta y controlador de Usuario
 *
 * Destinado a la definición de endpoints,
 * middlewares de protección de ruta
 * y especificación de campos a aceptar
 */

const { Router } = require('express');
const {
	createUser,
	loginUser,
	deleteUser,
	searchUser,
	updateUser,
} = require('../services/userService');
const userExtractor = require('../middleware/userExtractor');
const route = Router();

// Ruta para crear un nuevo usuario
route.post('/', async (req, res, next) => {
	try {
		const { body } = req;
		const newData = {
			email: body.email, // required
			password: body.password, // required
			name: body.name, // optional
			lastName: body.lastName, // optional
			telephone: body.telephone, // optional
		};
		const newUser = await createUser(newData);
		res.status(201).json(newUser).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para inicio de sesión de un usuario
route.post('/login', async (req, res, next) => {
	try {
		const { body } = req;
		const data = {
			email: body.email, // required
			password: body.password, // required
		};
		const user = await loginUser(data);
		res.status(201).json(user).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para cambiar contraseña de un usuario
route.post('/password', async (req, res, next) => {
	try {
		const { body } = req;
		// eslint-disable-next-line no-unused-vars
		const newData = {
			email: body.email,
			oldPassword: body.password,
			newPassword: body.password,
		};
		const userJWT = { message: 'El JWT' };
		res.status(201).json(userJWT).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para obtener un usuario por ID
route.get('/:id', userExtractor, async (req, res, next) => {
	try {
		const { userId } = req.user;
		const { id } = req.params;
		const user = await searchUser({ id, userId });
		res.status(200).json(user).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para actualizar un usuario por ID
route.put('/:id', userExtractor, async (req, res, next) => {
	try {
		const { userId } = req.user;
		const { id } = req.params;
		const { body } = req;
		const updateData = {
			name: body.name, // optional
			lastName: body.lastName, // optional
			telephone: body.telephone, // optional
			image: body.image, // optional
		};
		const updatedUser = await updateUser({ ...updateData, id, userId });
		res.status(200).json(updatedUser).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para eliminar un usuario por ID
route.delete('/:id', userExtractor, async (req, res, next) => {
	try {
		const { userId } = req.user;
		const { id } = req.params;
		const data = await deleteUser({ id, userId });
		res.status(200).json(data).end();
	} catch (err) {
		next(err);
	}
});

module.exports = route;

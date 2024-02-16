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
	deleteUser,
	searchUser,
	updateUser,
	searchUserEmail,
} = require('../services/userService');
const { createAccessToken } = require("../libs/jwt");
const { ValidationError } = require('../middleware/customErrors');
const bcrypt = require('bcrypt');
const route = Router();

// Ruta para crear un nuevo usuario
route.post('/', async (req, res, next) => {
	try {
		const { body } = req;
		const newData = {
			email: body.email,
			password: body.password,
			name: body.name,
			lastName: body.lastName,
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
		const { email, password } = req.body;
		const userFound = await searchUserEmail(email)

		if (!userFound) {
			throw new ValidationError(
				'User not found.',
			);
		  }
		  const isMatch = await bcrypt.compare(password, userFound.password);

      if (!isMatch) {
        throw new ValidationError(
			'Incorrect password.',
		);
      }

      const token = await createAccessToken({ id: userFound._id });

      res.cookie("token", token, {
        sameSite: 'none',
        secure: true
      });

      res.json({
        id: userFound._id,
        email: userFound.email,
        name: userFound.name,
        lastName: userFound.lastName,
        token: token}).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para cambiar contraseña de un usuario
route.post('/password', async (req, res, next) => {
	try {
		const { body } = req;
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
route.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await searchUser(id);
		res.status(200).json(user).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para actualizar un usuario por ID
route.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const updateData = {
			nickName: body.nickName,
			telephone: body.telephone,
			image: body.image,
		};
		const updatedUser = await updateUser(id, updateData);
		res.status(200).json(updatedUser).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para eliminar un usuario por ID
route.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const data = await deleteUser(id);
		res.status(200).json(data).end();
	} catch (err) {
		next(err);
	}
});

module.exports = route;

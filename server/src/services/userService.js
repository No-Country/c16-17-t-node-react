/**
 * Servicios de Usuario
 *
 * Destinado a la validación de campos y la conexión con la base de datos.
 */

const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { ValidationError } = require('../middleware/customErrors');

const createUser = async ({ email, password, name, lastName }) => {
	if (!email || !password || !name || !lastName) {
		throw new ValidationError(
			'Email, password, name and lastName are required for user creation.',
		);
	}
	if (password.length < 8) {
		throw new ValidationError('Password must be at least 8 characters.');
	}

	if (!/[A-Z]/.test(password)) {
		throw new ValidationError(
			'The password must contain at least one uppercase letter.',
		);
	}

	if (!/[\W_]/.test(password)) {
		throw new ValidationError(
			'The password must contain at least one special character.',
		);
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await userSchema.create({
		email,
		password: hashedPassword,
		name,
		lastName,
	});
	return newUser;
};

const searchUser = async (id) => {
	const user = await userSchema.findById(id);
	return user;
};

const updateUser = async (id, updateData) => {
	const updatedUser = await userSchema.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});
	return updatedUser;
};

const deleteUser = async (id) => {
	const data = await userSchema.deleteOne({ _id: id });
	return data;
};

module.exports = { createUser, searchUser, updateUser, deleteUser };

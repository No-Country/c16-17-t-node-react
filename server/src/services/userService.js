/**
 * Servicios de Usuario
 *
 * Destinado a la validación de campos y la conexión con la base de datos.
 */

const userSchema = require('../models/userSchema');

const createUser = async (newData) => {
	const newUser = await userSchema.create(newData);
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

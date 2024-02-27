/**
 * Servicios de Usuario
 *
 * Destinado a la validación de campos
 * y la conexión con la base de datos.
 */

const userSchema = require('../models/userSchema');
const petSchema = require('../models/petSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const {
	ValidationError,
	IncorrectData,
} = require('../middleware/customErrors');

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

const loginUser = async ({ email = '', password = '' }) => {
	const userFound = await userSchema.findOne({ email });
	const isMatch =
		userFound === null
			? false
			: await bcrypt.compare(password, userFound.password);
	if (!isMatch) throw new ValidationError('Invalid email or password.');

	const accessToken = jwt.sign(
		{ id: userFound._id },
		process.env.SECRET_TOKEN,
		{ expiresIn: 60 * 60 * 24 * 7 }, //Tiempo de expiración en seg
	);
	return {
		...userFound.toJSON(),
		accessToken,
	};
};

const searchUser = async ({ userId, id }) => {
	if (id != userId) throw new ValidationError('Insufficient permissions');
	const user = await userSchema.findById(id);
	return user;
};

const updateUser = async ({ userId, id, updateData }) => {
	if (id != userId) throw new ValidationError('Insufficient permissions');
	const updatedUser = await userSchema.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});
	return updatedUser;
};

const deleteUser = async ({ userId, id }) => {
	if (id != userId) throw new ValidationError('Insufficient permissions');
	const user = await userSchema.findById(userId);
	if (!user) IncorrectData(`The user with id ${userId} was not found.`);
	await petSchema.deleteMany({ owner: userId });
	return await userSchema.deleteOne({ _id: userId });
};

module.exports = { createUser, loginUser, searchUser, updateUser, deleteUser };

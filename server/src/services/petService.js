/**
 * Servicios de Mascota
 *
 * Destinado a la validación de campos
 * y la conexión con la base de datos.
 */

const petModel = require('../models/petModel');
const userModel = require('../models/userModel');
const {
	IncorrectData,
	ValidationError,
} = require('../middleware/customErrors');

const createPet = async ({ owner, ...newData }) => {
	const user = await userModel.findById(owner);
	if (!user) throw new IncorrectData('The "User" field must reference a valid UserID.');
	const newPet = await this.model('Pet').create({ owner, ...newData });
	await userModel.findByIdAndUpdate(user._id, { $push: { pets: newPet._id } });
	return newPet;
};

const searchPet = async (id) => {
	const pet = await petModel.findById(id).populate('owner', 'name telephone');
	return pet;
};

const updatePet = async ({ owner, id, ...updateData }) => {
	const pet = await petModel.findById(id);
	if (!pet) throw new IncorrectData(`The pet with id ${id} was not found.`);
	if (pet.owner != owner)	throw new ValidationError('Insufficient permissions.');
	const updatedPet = await petModel.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});
	return updatedPet;
};

const deletePet = async ({ owner, id }) => {
	const pet = await petModel.findById(id);
	if (!pet) throw new IncorrectData(`The pet with id ${id} was not found.`);
	if (pet.owner != owner)
		throw new ValidationError('Insufficient permissions.');
	const User = require('./userSchema');
	await User.findOneAndUpdate({ _id: pet.owner }, { $pull: { pets: id } });
	const isDelete = await petModel.deleteOne({ _id: id });
	return isDelete;
};

module.exports = { createPet, searchPet, updatePet, deletePet };

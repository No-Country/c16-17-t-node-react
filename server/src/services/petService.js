/**
 * Servicios de Mascota
 *
 * Destinado a la validación de campos
 * y la conexión con la base de datos.
 */

const petSchema = require('../models/petSchema');

const createPet = async (newData) => {
	const newPet = await petSchema.createPet(newData);
	return newPet;
};

const searchPet = async (id) => {
	const pet = await petSchema.findById(id).populate('owner', 'name telephone');
	return pet;
};

const updatePet = async (id, updateData) => {
	const updatedPet = await petSchema.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});
	return updatedPet;
};

const deletePet = async (petData) => {
	const data = await petSchema.deletePet(petData);
	return data;
};

module.exports = { createPet, searchPet, updatePet, deletePet };

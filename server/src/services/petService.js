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
	const pet = await petSchema.findById(id);
	return pet;
};

const updatePet = async (id, updateData) => {
	const updatedPet = await petSchema.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});
	return updatedPet;
};

const deletePet = async (id) => {
	const data = await petSchema.deleteOne({ _id: id });
	return data;
};

module.exports = { createPet, searchPet, updatePet, deletePet };

/**
 * Servicios de Mascota
 *
 * Destinado a la validación de campos
 * y la conexión con la base de datos.
 */

const userSchema = require('../models/userSchema');
const petSchema = require('../models/petSchema');
const reportSchema = require('../models/reportSchema');
const sendMail = require('../middleware/sendEmail');
const {
	IncorrectData,
	ValidationError,
} = require('../middleware/customErrors');

const createPet = async ({ owner, ...newData }) => {
	if (!newData.nickName) {
		throw new ValidationError('nickName are required for pet creation.');
	}
	const user = await userSchema.findById(owner);
	if (!user)
		throw new IncorrectData('The "User" field must reference a valid UserID.');
	const newPet = await petSchema.create({ owner, ...newData });
	await userSchema.findByIdAndUpdate(user._id, { $push: { pets: newPet._id } });
	return newPet;
};

const reportPet = async ({ id, ...data }) => {
	const pet = await petSchema.findById(id).populate('owner', 'name email');
	const report = await reportSchema.create({ ...data, petID: pet._id });
	const mailOptions = {
		to: `${pet.owner.email}`,
		subject: `Nuevo reporte de tu mascota ${pet.nickName}`,
		text: '',
		html: `<h2>Hola ${pet.owner.name}</h2>	<h3>Alguien ha creado un nuevo reporte de tu mascota ${pet.nickName}</h3> <h4>Esperamos que se puedan contactar con los siguientes datos:</h4>	<h4>Name hero: ${report.heroName}</h4>	<h4>Email: ${report.email}</h4>	<h4>Telephone: ${report.telephone}</h4> <h4>Description: ${report.description}</h4>`,
	};
	await sendMail(mailOptions);
	return { message: 'Report sent successfully!' };
};

const searchPets = async ({ filter, page = 1, limit = 4 }) => {
	let options = {};
	if (filter === 'lost') options.lost = true;
	const pets = await petSchema
		.find(options)
		.skip((parsedInt(page) - 1) * parsedInt(limit))
		.limit(parsedInt(limit))
		.select('-lost')
		.populate('owner', 'name telephone');
	return pets;
};

const searchPet = async (id) => {
	const pet = await petSchema.findById(id).populate('owner', 'name telephone');
	return pet;
};

const updatePet = async ({ owner, id, ...updateData }) => {
	const pet = await petSchema.findById(id);
	if (!pet) throw new IncorrectData(`The pet with id ${id} was not found.`);
	if (pet.owner != owner)
		throw new ValidationError('Insufficient permissions.');
	const updatedPet = await petSchema.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});
	return updatedPet;
};

const deletePet = async ({ owner, id }) => {
	const pet = await petSchema.findById(id);
	if (!pet) throw new IncorrectData(`The pet with id ${id} was not found.`);
	if (pet.owner != owner)
		throw new ValidationError('Insufficient permissions.');
	await userSchema.findOneAndUpdate(
		{ _id: pet.owner },
		{ $pull: { pets: id } },
	);
	const isDelete = await petSchema.deleteOne({ _id: id });
	return isDelete;
};

function parsedInt(value) {
	const parsedValue = parseInt(value, 10);
	if (!parsedValue || parsedValue <= 0)
		throw new IncorrectData(`Invalid value: ${value}`);
	return parsedValue;
}

module.exports = {
	createPet,
	deletePet,
	reportPet,
	searchPet,
	searchPets,
	updatePet,
};

// report.schema.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
	heroName: {
		type: String,
		default: '',
	},
	email: {
		type: String,
		default: '',
	},
	telephone: {
		type: Number,
		default: '',
	},
	description: {
		type: String,
		default: '',
	},
	petID:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Pet',
		required: [true, 'The "Pet" field is required.'],
		validate: {
			validator: async function (value) {
				const Pet = mongoose.model('Pet');
				const pet = await Pet.findById(value);
				return pet !== null;
			},
			message: 'The "Pet" field must reference a valid PetID.',
		},
	},
});

if (mongoose.models.Report) {
	module.exports = mongoose.models.Report;
} else {
	module.exports = mongoose.model('Report', reportSchema);
}

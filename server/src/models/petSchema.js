// pet.schema.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
	nickName: {
		type: String,
		required: [true, 'The "nickname" field is required.'],
	},
	breed: {
		type: String,
		default: '',
	},
	birth: {
		type: Number,
		default: 0,
	},
	lost: {
		type: Boolean,
		default: false,
	},
	description: {
		type: String,
		default: '',
	},
	images: {
		type: [
			{
				id: String,
				url: String,
			},
		],
		default: [],
		validate: {
			validator: function (images) {
				return images.every((image) => image.id && image.url);
			},
			message:
				'Each image object in the "images" array must have both "id" and "URL" properties.',
		},
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'The "user" field is required.'],
		validate: {
			validator: async function (value) {
				const User = mongoose.model('User');
				const user = await User.findById(value);
				return user !== null;
			},
			message: 'The "User" field must reference a valid UserID.',
		},
	},
});

petSchema.methods.toJSON = function () {
	const petObject = this.toObject();
	petObject.id = petObject._id;
	delete petObject._id;
	delete petObject.__v;
	if (petObject?.owner?.toString() === '[object Object]') {
		petObject.owner.id = petObject.owner._id;
		delete petObject.owner._id;
	}
	return petObject;
};

if (mongoose.models.Pet) {
	module.exports = mongoose.models.Pet;
} else {
	module.exports = mongoose.model('Pet', petSchema);
}

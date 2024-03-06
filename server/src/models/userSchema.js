// user.schema.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: [true, 'The "email" field is required.'],
		match: [
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			'Invalid email format. Please enter a valid email address.',
		],
	},
	password: {
		type: String,
		required: [true, 'The "password" field is required.'],
	},
	name: {
		type: String,
		default: '',
	},
	lastName: {
		type: String,
		default: '',
	},
	telephone: {
		type: Number,
		default: null,
	},
	image: {
		type: {
			id: String,
			url: String,
		},
		default: {},
		validate: {
			validator: function (image) {
				return image.id && image.url;
			},
			message: 'the "image" object must have "id" and "url" properties.',
		},
	},
	pets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			default: [],
			ref: 'Pet',
			validate: {
				validator: async function (value) {
					const Pet = mongoose.model('Pet');
					const pet = await Pet.findById(value);
					return pet !== null;
				},
				message: 'The "Pet" field must reference a valid PetID.',
			},
		},
	],
	linkedin: {
		type: String,
		default: null,
	},
	facebook: {
		type: String,
		default: null,
	},
	instagram: {
		type: String,
		default: null,
	},
	twitter: {
		type: String,
		default: null,
	},
});

userSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	userObject.id = userObject._id;
	delete userObject.password;
	delete userObject._id;
	delete userObject.__v;
	return userObject;
};

if (mongoose.models.User) {
	module.exports = mongoose.models.User;
} else {
	module.exports = mongoose.model('User', userSchema);
}

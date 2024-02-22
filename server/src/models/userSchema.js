// user.schema.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
		default: 0,
	},
	image: {
		type: String,
		default: '',
	},
	pets: [
		{
			type: Schema.Types.ObjectId,
			default: [],
			ref: 'Pet',
			validate: {
				validator: async function (value) {
					const Pet = require('./petSchema');
					const pet = await Pet.findById(value);
					return pet !== null;
				},
				message: 'The "Pet" field must reference a valid PetID.',
			},
		},
	],
});

userSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	userObject.id = userObject._id;
	delete userObject.password;
	delete userObject._id;
	delete userObject.__v;
	return userObject;
};

module.exports = model('User', userSchema);

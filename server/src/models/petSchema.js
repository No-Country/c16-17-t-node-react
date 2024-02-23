// pet.schema.js
const { Schema, model } = require('mongoose');

const petSchema = new Schema({
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
				"Each image object in the 'images' array must have both 'id' and 'URL' properties.",
		},
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'The "user" field is required.'],
		validate: {
			validator: async function (value) {
				const User = require('./userSchema');
				const user = await User.findById(value);
				return user !== null;
			},
			message: "The 'User' field must reference a valid UserID.",
		},
	},
});

petSchema.statics.createPet = async function ({ owner, ...newData }) {
	const User = require('./userSchema');
	const user = await User.findById(owner);
	if (!user) throw new Error("The 'User' field must reference a valid UserID.");
	const newPet = await this.model('Pet').create({ owner, ...newData });
	await User.findByIdAndUpdate(user._id, { $push: { pets: newPet._id } });
	return newPet;
};

petSchema.methods.toJSON = function () {
	const petObject = this.toObject();
	petObject.id = petObject._id;
	delete petObject._id;
	delete petObject.__v;
	if (Array.isArray(petObject.owner)) {
		petObject.owner.id = petObject.owner._id;
		delete petObject.owner._id;
	}
	return petObject;
};

module.exports = model('Pet', petSchema);

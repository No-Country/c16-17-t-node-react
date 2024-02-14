// user.schema.ts
import mongoose from 'mongoose';
import { UserModel } from './user.dto';

const userSchema = new mongoose.Schema<UserModel>({
	email: {
		type: String,
		required: [true, 'The "email" field is required.'],
		unique: true,
		match: [
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			'Invalid email format. Please enter a valid email address.',
		],
	},
	password: {
		type: String,
		required: [true, 'The "password" field is required.'],
	},
	nickName: {
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
	pets: {
		type: [mongoose.Schema.Types.ObjectId],
		default: [],
		validate: {
			validator: async function (pets: mongoose.Schema.Types.ObjectId[]) {
				const Pet = mongoose.model('Pet');
				const petsCount = await Pet.countDocuments({ _id: { $in: pets } });
				console.log(pets, petsCount);

				return petsCount === pets.length;
			},
			message: "One or more 'pets' IDs are not valid.",
		},
	},
});

userSchema.methods.toJSON = function () {
	const userObject: Record<string, any> = this.toObject();
	userObject.id = userObject._id;
	delete userObject.password;
	delete userObject._id;
	delete userObject.__v;
	return userObject;
};

export default mongoose.model<UserModel>('User', userSchema);

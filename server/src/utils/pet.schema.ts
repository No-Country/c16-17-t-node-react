// user.schema.ts
import mongoose from 'mongoose';
import { User } from './user.dto';

const userSchema = new mongoose.Schema<User>({
	nickName: {
		type: String,
		required: [true, "The 'nickname' field is required."],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "The 'email' field is required."],
		unique: true,
		match: [
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			'Invalid email format. Please enter a valid email address.',
		],
	},
	occupation: {
		type: String,
		required: [true, "The 'occupation' field is required."],
		validate: {
			validator: (value: Occupation) =>
				Object.values(Occupation).includes(value),
			message: `Must be [${Object.values(Occupation)}]`,
		},
	},
});

userSchema.methods.toJSON = function () {
	const userObject: Record<string, any> = this.toObject();
	userObject.id = userObject._id;
	delete userObject._id;
	delete userObject.__v;
	return userObject;
};

export default mongoose.model<User>('User', userSchema);

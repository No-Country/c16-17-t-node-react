// pet.schema.ts
import mongoose from 'mongoose';
import { PetModel } from './pet.dto';

const petSchema = new mongoose.Schema<PetModel>({
	nickName: {
		type: String,
		required: [true, 'The "nickname" field is required.'],
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'The "user" field is required.'],
		validate: {
			validator: async function (value: String) {
				const User = mongoose.model('User');
				const owner = await User.findById(value);
				return owner !== null;
			},
			message: 'The "owner" field must reference a valid user.',
		},
  },
	breed: {
		type: String,
		default: '',
	},
	birth: {
		type: Number,
		default: 0,
	},
	image: {
		type: String,
		default: '',
	},
});

petSchema.methods.toJSON = function () {
	const petObject: Record<string, any> = this.toObject();
	petObject.id = petObject._id;
	delete petObject._id;
	delete petObject.__v;
	return petObject;
};

export default mongoose.model<PetModel>('Pet', petSchema);

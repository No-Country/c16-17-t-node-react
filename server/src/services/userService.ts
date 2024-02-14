import userSchema from '../models/user.schema';
import { UserCreate, UserModel, UserUpdate } from '../models/user.dto';

export async function createUser(newData: UserCreate): Promise<UserModel> {
	const newUser = await userSchema.create(newData);
	return newUser;
}

export async function searchUser(id: string): Promise<UserModel> {
	const user = await userSchema.findById(id);
	return user;
}

export async function updateUser(
	id: string,
	updateData: UserUpdate,
): Promise<UserModel> {
	const updatedUser = await userSchema.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});
	return updatedUser;
}

export async function deleteUser(id: string): Promise<any> {
	const data = await userSchema.deleteOne({ _id: id });
	return data;
}

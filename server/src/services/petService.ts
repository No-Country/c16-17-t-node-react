import petSchema from '../models/pet.schema';
import { PetCreate, PetModel, PetUpdate } from '../models/pet.dto';

export async function createPet(newData: PetCreate): Promise<PetModel> {
	const newPet = await petSchema.create(newData);
	return newPet;
}

export async function searchPet(id: string): Promise<PetModel> {
	const pet = await petSchema.findById(id);
	return pet;
}

export async function updatePet(
	id: string,
	updateData: PetUpdate,
): Promise<PetModel> {
	const updatedPet = await petSchema.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	});
	return updatedPet;
}

export async function deletePet(id: string): Promise<any> {
	const data = await petSchema.deleteOne({ _id: id });
	return data;
}

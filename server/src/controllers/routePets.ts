// route.ts
import { Router, Request, Response, NextFunction } from 'express';
import petSchema from '../models/pet.schema';
import { PetCreate, PetUpdate } from '../models/pet.dto';
import {
	createPet,
	deletePet,
	searchPet,
	updatePet,
} from '../services/petService';
const route = Router();

// Ruta para crear una nueva mascota
route.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = req;
		const newData: PetCreate = {
			nickName: body.nickName,
			owner: body.owner,
		};
		const newPet = await createPet(newData);
		res.status(201).json(newPet).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para obtener una mascota por ID
route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const pet = await searchPet(id);
		res.status(200).json(pet).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para actualizar una mascota por ID
route.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const updateData: PetUpdate = {
			nickName: body.nickName,
			breed: body.breed,
			birth: body.birth,
			image: body.image,
		};
		const updatedPet = await updatePet(id, updateData);
		res.status(200).json(updatedPet).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para eliminar una mascota por ID
route.delete(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const data = await deletePet(id);
			res.status(200).json(data).end();
		} catch (err) {
			next(err);
		}
	},
);

export default route;

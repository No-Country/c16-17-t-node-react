// route.ts
import { Router, Request, Response, NextFunction } from 'express';
import { UserCreate, UserUpdate } from '../models/user.dto';
import {
	createUser,
	deleteUser,
	searchUser,
	updateUser,
} from '../services/userService';
const router = Router();

// Ruta para crear un nuevo usuario
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = req;
		const newData: UserCreate = {
			email: body.email,
			password: body.password,
		};
		const newUser = await createUser(newData);
		res.status(201).json(newUser).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const user = await searchUser(id);
		res.status(200).json(user).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para actualizar un usuario por ID
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const updateData: UserUpdate = {
			nickName: body.nickName,
			telephone: body.telephone,
			image: body.image,
		};
		const updatedUser = await updateUser(id, updateData);
		res.status(200).json(updatedUser).end();
	} catch (err) {
		next(err);
	}
});

// Ruta para eliminar un usuario por ID
router.delete(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const data = await deleteUser(id);
			res.status(200).json(data).end();
		} catch (err) {
			next(err);
		}
	},
);

export default router;

// pet.dto.ts
import mongoose from 'mongoose';

export interface PetModel {
	id?: string;
	nickName: string;
	owner: mongoose.Schema.Types.ObjectId; // Dueño
	breed: string; // Raza
	birth: Number; // Nacimiento
	image: string;
}

export interface PetCreate {
	nickName: string;
	owner: string;
}

export interface PetUpdate {
	nickName: string;
	breed: string;
	birth: Number; 
	image: string;
}
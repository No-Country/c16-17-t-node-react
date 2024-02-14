// user.dto.ts
import mongoose from "mongoose";

export interface UserModel {
	id?: string;
	email: string;
	password: string;
	nickName: string;
	telephone: number;
	image: string;
	pets: mongoose.Schema.Types.ObjectId[];
}

export interface UserCreate {
	email: string;
	password: string;
}

export interface UserUpdate {
	nickName: string;
	telephone: number;
	image: string;
}
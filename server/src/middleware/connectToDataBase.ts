// connectToDatabase.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URL: string = process.env.MONGO_URL as string;
const DB_NAME: string = process.env.DB_NAME || 'PetPal';

// Función para conectar a la base de datos
const connectToDatabase = async (): Promise<void> => {
	try {
		const db = await mongoose.connect(MONGO_URL, { dbName: DB_NAME });
		console.log('Database is connected to', db.connection.name);
	} catch (err: any) {
		console.error('Error connecting to the database:', err.stack);
	}
};

// Manejo de desconexión al recibir la señal de cierre (SIGINT)
process.on('SIGINT', async () => {
	try {
		await mongoose.connection.close();
		console.log('Disconnected from the database.');
		process.exit(0);
	} catch (err: any) {
		console.error(err.stack);
		process.exit(1);
	}
});

export default connectToDatabase;

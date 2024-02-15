// connectToDatabase.js
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'PetPal';

// Función para conectar a la base de datos
const connectToDatabase = async () => {
	try {
		const db = await mongoose.connect(MONGO_URL, { dbName: DB_NAME });
		console.log('Database is connected to', db.connection.name);
	} catch (err) {
		console.error('Error connecting to the database:', err.stack);
	}
};

// Manejo de desconexión al recibir la señal de cierre (SIGINT)
process.on('SIGINT', async () => {
	try {
		await mongoose.connection.close();
		console.log('Disconnected from the database.');
		process.exit(0);
	} catch (err) {
		console.error(err.stack);
		process.exit(1);
	}
});

module.exports = connectToDatabase;

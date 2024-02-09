// handleErrors.js

const ERROR_HANDLERS = {
	IncorrectData: (err, res) => {
		const name = err.name || err.code || 'Error';
		const message = err.message || 'Internal Server Error';
		res.status(400).json({ name, message }).end();
	},
	JsonWebTokenError: (err, res) => {
		const name = err.name || err.code || 'Error';
		const message = err.message || 'Internal Server Error';
		res.status(401).json({ name, message }).end();
	},
	MongoServerError: (err, res) => {
		const name = err.name || err.code || 'Error';
		const message = err.message || 'Internal Server Error';
		res.status(400).json({ name, message }).end();
	},
	ValidationError: (err, res) => {
		const name = err.name || err.code || 'Error';
		const message = err.message || 'Internal Server Error';
		res.status(400).json({ name, message }).end();
	},
	defaultError: (err, res) => {
		const name = err.name || err.code || 'Error';
		const status = err.status || 500;
		const message = err.message || 'Internal Server Error';
		if (process.env.LOCATION === 'localhost') console.error(name, err.stack);
		res.status(status).json({ name, message }).end();
	},
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, _next) => {
	const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;
	handler(err, res);
};

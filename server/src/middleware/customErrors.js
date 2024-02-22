class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ValidationError';
	}
}

class IncorrectData extends Error {
	constructor(message) {
		super(message);
		this.name = 'IncorrectData';
	}
}
module.exports = {
	ValidationError,
	IncorrectData,
};

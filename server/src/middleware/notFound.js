// notFound.ts
module.exports = (_req, res) => {
	res.status(404).send('404 Not Found').end();
};

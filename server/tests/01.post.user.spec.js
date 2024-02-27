const session = require('supertest-session');
const { expect } = require('chai');
const app = require('../src/app');

const agent = session(app);

describe('primero /', () => {
	describe('segundo /', () => {
		it('1"', async () => {
			const response = await agent.get('/');
			expect(response.status).to.equal(200);
			expect(response.text).to.equal('¡Hola, mundo!');
		});
		it('2', async () => {
			const response = await agent.get('/pets/lost');
			expect(response.status).to.equal(200);
			expect(response.to).to.equal(undefined);
		});
	});
});
